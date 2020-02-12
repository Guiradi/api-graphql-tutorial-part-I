const postList = [
    {
        id: 1,
        title: "Meu primeiro blog post!",
        content: "Olá leitores assíduos do meu blog, este é meu primeiro blog post e nele eu só desejo dar-lhes as boas vindas!",
        author: "Guilherme Ferreira",
        created_at: new Date('2020-02-07T09:35').toDateString()
    },
    {
        id: 2,
        title: "Meu segundo blog post!",
        content: "Olá leitores assíduos do meu blog, este é meu segundo blog post e nele eu queria dizer como estou contente hoje!",
        author: "Guilherme Ferreira",
        created_at: new Date('2020-02-10T08:00').toDateString()
    }
]

module.exports = {
    post: ({ id }) => postList.find(post => post.id === +id),

    posts: () => postList
}