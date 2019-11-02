module.exports = {
    hello: () => 'Hello World!',

    randomNumber: () => Math.random(),

    rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),

    isSaturday: () => (new Date()).getDay() === 6
}