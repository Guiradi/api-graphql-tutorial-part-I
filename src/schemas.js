module.exports = `
    type Post {
        id: ID!
        title: String!
        content: String
        author: String
        created_at: String
    }

    type Query {
        post(id: ID!): Post!
        posts: [Post!]!
    }
`