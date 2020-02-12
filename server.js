// Imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// resolvers
const rootValue = require('./src/resolvers');

// queries
const queries = require('./src/schemas');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(queries),
    rootValue,
    graphiql: true
}));

app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));