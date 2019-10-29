// Imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Schemas
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Resolvers
const rootValue = {
    hello: () => 'Hello World!'
};


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));