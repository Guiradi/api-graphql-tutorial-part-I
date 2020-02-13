let postList = [
    {
        id: 1,
        title: 'Meu primeiro blog post!',
        content: 'Olá leitores assíduos do meu blog, este é meu primeiro blog post e nele eu só desejo dar-lhes as boas vindas!',
        author: 'Guilherme Ferreira',
        created_at: new Date('2020-02-07T09:35').toDateString()
    },
    {
        id: 2,
        title: 'Meu segundo blog post!',
        content: 'Olá leitores assíduos do meu blog, este é meu segundo blog post e nele eu queria dizer como estou contente hoje!',
        author: 'Guilherme Ferreira',
        created_at: new Date('2020-02-10T08:00').toDateString()
    }
]

module.exports = {
    post: ({ id }) => postList.find(post => post.id === +id),

    posts: () => postList,

    createPost: ({ input }) => {
        const newPost = { ...input, id: postList.length + 1, created_at: new Date().toDateString() };
        postList.push(newPost);
        return newPost;
    },

    updatePost: ({ input }) => {
        const { id: postId, ...newPostData } = input
        const index = postList.map(({ id }) => id).indexOf(+postId);
        postList[index] = { ...postList[index], ...newPostData };
        return postList[index];
    },

    deletePost: ({ id: postId }) => {
        postList = postList.filter(({ id }) => id !== +postId);
        return true;
    }
}