module.exports = `
    type Query {
        hello: String,
        randomNumber: Float!,
        rollThreeDice: [Int],
        isSaturday: Boolean!,

        rollDices(numDices: Int!, numSides: Int!): [Int]
    }
`