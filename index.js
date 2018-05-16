// Declare Imports
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSche, makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Import Models
import models from './models';

// Import Refresh tokens
import { refreshTokens } from './auth';

// Declare Secret Variables
const SECRET = 'mayfifteentwentyeighteenabcd';
const SECRET2 = 'mayfifteentwentyeighteenefgh';

// Declare Resolvers and Schema From Folders, and merge files
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

// Execute Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize express
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET2,
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

// Create Entry point for GraphQL
const graphqlEndpoint = '/graphql';
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    },
  })),
);
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

// Run server
models.sequelize.sync({}).then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000...');
  });
});
