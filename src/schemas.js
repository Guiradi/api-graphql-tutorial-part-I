module.exports = `
    type Post {
        id: ID!
        title: String!
        content: String
        author: String
        created_at: String
        comments: [Comment]
        likes: [Like]
    }

    type Comment {
        id: ID!
        content: String
        author: String
        created_at: String
        post: Post!
        likes: [Like]
    }

    union LikedObject = Post | Comment

    type Like {
        id: ID!
        type: String!
        likedObject: LikedObject!
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