module.exports = `
    type Post {
        id: ID!
        title: String!
        content: String
        author: String
        created_at: String
    }

    input PostInput {
        id: ID
        title: String
        content: String
        author: String
    }

    type Query {
        post(id: ID!): Post!
        posts: [Post!]!
    }

    type Mutation {
        createPost(input: PostInput!): Post!
        updatePost(input: PostInput!): Post!
        deletePost(id: ID!): Boolean
    }
`