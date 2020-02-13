# Como construir uma Api GraphQL com NodeJS parte 3

Hoje é o dia que tanto esperávamos, vamos começar uma API de um blog!

## Introdução:

Olá novamente, caros devs e devas de todo Brasil, como estamos?

Este artigo faz parte de uma série de artigos sobre como construir uma API GraphQL com NodeJS e ExpressJS, que você pode acompanhar nos links: 
       - [Parte 1](https://ezdevs.com.br/como-construir-uma-api-graphql-com-nodejs/)
       - [Parte 2](https://ezdevs.com.br/como-construir-uma-api-graphql-com-nodejs-parte-2/)

Se você ainda não conferiu os artigos, vale a pena dar uma conferida, pois alguns conceitos fundamentais sobre o expressJS e, principalmente, sobre o GraphQL foram introduzidos. No entanto, é importante notar que apenas conceitos básicos foram introduzidos, então chega dessa lenga lenga e bora codar algo de verdade! XD

## Hello World, ok. Rolar dados, ok. E agora?

Agora que entendemos o funcionamento do GraphQL e conhecemos os tipos de variáveis e como trabalhar com elas, montaremos uma estrutura mais complexa de API, onde faremos buscas, criações, atualizações e deleções. Ao final, teremos um CRUD completo e você poderá usar de base para trabalhar seus projetos!
Mas antes de irmos para a prática, lembre-se de estar em dia com os conceitos de GraphQL, e para isso, você poderá complementar seus estudos com [o vídeo fantástico de Gabriel Cardoso](https://www.youtube.com/watch?v=0MfMYPvimYo&trk=) que abordará dois types que investigaremos a fundo hoje: queries e mutations. 
Queries e mutations, na prática, são tratadas exatamente iguais para o GraphQL, no entanto, para nós, os utilizaremos para definir como será feita a consulta e a manipulação de dados. Enquanto que, utilizaremos queries para definir as consultas dos dados, ou seja, atuando como o método GET de uma API Rest, as mutations são utilizadas para definir qualquer manipulação a ser feita no dado, seja ela uma criação, alteração ou até deleção, atuando como os métodos POST, PUT, PATCH e DELETE de uma API Rest.
Mas chega de papo, bora codar!

### Início da receitinha parte 3
 - Abra o projeto finalizado na parte 2 desse tutorial (ou clone essa [pasta](https://github.com/Guiradi/Tutorial-API-GraphQL/tree/master/api-graphql-tutorial-part-II)) no seu editor de textos favorito e começaremos fazendo uma pequena alteração em server.js.

 - Alteraremos o nome da variável queries (linha 10) para schemas, porque é isso o que realmente o são!

              // schemas
              const schemas = require('./src/schemas');

Em seguida, vamos preparar nosso CRUD nos schemas e, para isso, vamos utilizar como exemplo um CRUD de um Blog. Um blog possui, basicamente, posts e esses posts precisam ser criados, atualizados e deletados.

 - Em schemas, criaremos duas queries, uma para buscar apenas 1 post e uma para buscar vários posts:

              module.exports = `
                     type Query {
                            post(id: ID!): Post!
                            posts: [Post!]!
                     }
              `

## Certo, lembro de termos estudado String, Int, Float e Boolean, mas ID????
 
Muito bem, o GraphQL entende que por ID estamos utilizando um identificador para aquele registro e, por isso, aceita números, símbolos e palavras nesse type.

## Ok, o ID está na documentação, mas type Post?????

Exatamente! Para mostrarmos posts, utilizaremos o type Post, mas ele não foi definido em lugar algum, então o GraphQL não saberá quem ele é até o apresentarmos!

 - Então, antes de definirmos as queries (por boas práticas), definiremos o type Post, que aqui funcionará como um model para o objeto Post que queremos ver do blog.

              type Post {
                     id: ID!
                     title: String!
                     content: String
                     author: String
                     created_at: String
              }

Não esqueça de salvar todo seu progresso até aqui, tanto no editor quanto no Github!

Pronto! Tudo certo com os schemas, então é hora de construirmos os resolvers! Para construir algo simples, ainda não integraremos essa API a nenhum banco de dados, portanto produziremos dados falsos salvos na própria aplicação, construindo uma variável que receberá e mostrará esses dados no nosso resolver. Bora ver como fica?

### Buscando dados em seu resolver

 - Reconstrua seu resolver.js para:

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
                     posts: () => postList
              }

Podemos ver que criamos uma variável postList e nela incluimos dois objetos exatamente como definimos o nosso modelo de Post. Além disso, criamos dois resolvers, ou seja, funções com os mesmos nomes que nossos schemas possuem. 
No caso, post recebe uma variável id que retornará o post identificado pelo id pedido na query, enquanto posts não precisa receber nenhuma variável e retornará a lista completa de blog posts!

## Mas onde está a mágica do GraphQL nisso tudo?

Pois é, até agora não fizemos nada que uma API Rest não faria. Mas a mágica do GraphQL começa na hora de buscar esses dados! 
Nem sempre precisamos saber todas as informações de um blog post em qualquer página! Pode ser que você queira, em uma página, listar apenas os nomes dos posts acompanhados do nome do autor deles e isso é perfeitamente entendível tratando-se de visualizações mobile, por exemplo. É aí que o GraphQL cuida de tudo para nós, você busca o que você pede!

 - Rode seu server abrindo um terminal, navegando até o diretório da API e digitando:

              yarn start

 - ou (se optou utilizar o npm)

              npm start

Não se esqueça de conferir se os pacotes estão instalados caso tenha acabado de clonar ou forkear o repositório ( com yarn i ou npm i).

 - Em seguida, abra seu navegador em http://localhost:3333/graphql e teste:

              {
                     posts {
                            id
                            title
                            author
                     }
              }

Então verá a magia do GraphQL acontecendo! Lindo não?
 - Aproveite também para usar um dos ids mostrados em:

              {
                     post(id: 1) {
                            id
                            title
                            content
                            author
                            created_at
                     }
              }

Pois é possível que seu usuário clique em um dos posts para ver o seu conteúdo e mais informações sobre ele! Mas se quiser mostrar só o conteúdo, ou só a data de criação, tudo é possível! Brinque muito!

## Empolgados também? Então vamos terminar esse CRUD!

Agora que criamos as queries de busca, vamos começar as criações, edições e deleções! E, para isso, como falei anteriormente, defineremos os schemas de manipulações de dados nas mutations. Além disso, facilitaremos a leitura desses schemas criando os types Input do GraphQL.
Inputs são na verdade types utilizados como Models para nossos parâmetros enviados às mutations. Portanto, antes de escrevermos algo do tipo:

              createPost(title: String!, content: String, author: String): Post
              updatePost(id: ID!, title: String!, content: String, author: String): Boolean

Podemos definir um input que contenha os campos em comum em ambas as mutations, para facilitar a escrita e leitura do código.

 - Dessa forma, nosso arquivo schemas.js será:

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

Lembre-se que se algo não estiver muito claro ou muitas dúvidas surgirem em algum momento e não forem esclarecidas no texto, você sempre pode deixar um comentário ou enviar um e-mail para guilherme.ferreira@ezdevs.tech

 - Com os schemas prontos, vamos montar nossos resolvers do CRUD:
 
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

### Testes e mais testes!

A mágica do GraphQL para as mutations, no caso de criações e deleções, é que podemos criar posts apenas com os campos que especificarmos. É claro que, em APIs mais complexas, precisaremos tratar todos os possíveis erros, como por exemplo, não especificar alguns campos obrigatórios para que um post seja criado ou não enviar um id para atualizar o post, ou até enviar ids que não existam em sua base! Mas deixaremos isso para um outro momento.

Vamos fazer alguns testes no nosso playground (http://localhost:3333/graphql):

 - Criação:

              mutation {
                     createPost(input: {
                            title: "Meu terceiro blog post!",
                            content: "Olá leitores assíduos do meu blog, este é meu segundo blog post e nele eu queria dizer que estamos pertos de completar um CRUD! Terminei o método de criação com sucesso =D",
                            author: "Guilherme Ferreira"
                     }) {
                            id
                            title
                     }
              }

 - Atualização:

              mutation {
                     updatePost(input: { id: 3, title: "Terminando o CRUD" }) {
                            id
                            title
                     }
              }

 - Deleção:

              mutation {
                    deletePost(id: 1)
              }

Agora, se buscar pela query posts, terá uma resposta como:

 - Busca todos os posts:

              {
                     posts {
                            id
                            title
                            content
                            author
                            created_at
                     }
              }

 - Resposta:

              {
                     "data": {
                            "posts": [
                                   {
                                          "id": "2",
                                          "title": "Meu segundo blog post!",
                                          "content": "Olá leitores assíduos do meu blog, este é meu segundo blog post e nele eu queria dizer como estou contente hoje!",
                                          "author": "Guilherme Ferreira",
                                          "created_at": "Mon Feb 10 2020"
                                   },
                                   {
                                          "id": "3",
                                          "title": "Terminando o CRUD",
                                          "content": "Olá leitores assíduos do meu blog, este é meu segundo blog post e nele eu queria dizer que estamos pertos de completar um CRUD! Terminei o método de criação com sucesso =D",
                                          "author": "Guilherme Ferreira",
                                          "created_at": "Wed Feb 12 2020"
                                   }
                            ]
                     }
              }

E pronto! Agora você já consegue criar um CRUD completo e se utilizar os conhecimentos de todas as etapas, pode torná-lo muito mais complexo que isso, validando as entradas do usuário, personalizando as deleções (tente fazer uma deleção lógica!) e tratando os erros de resposta da API.

## Próximos passos

Se você chegou até aqui, sabe muito sobre o básico do GraphQL e é capaz até de construir um CRUD para seus primeiros projetos de API! Parabéns, use e abuse desse conhecimento, inclusive com muito da [documentação do graphQL](https://graphql.org/graphql-js) e divirta-se!

### O que falta agora?

Bom, nossa API cria uma variável e vai salvando valores dentro dela, isso lhe parece algo razoável? Claro que não! Então, em nosso próximo passo, faremos nossa API se tornar um pouco mais robusta e conectar-se a um banco de dados para salvar esses dados, além disso, não seria ótimo se as pessoas pudessem comentar e curtir os posts do nosso blog? Como podemos tornar isso simples com GraphQL?

Portanto, continue sendo um leitor assíduo desse tutorial de API que está se desenvolvendo e tem potencial para ser a próxima API do seu projeto! Além disso, deixe suas dúvidas e sugestões nos comentários, adoramos interagir com vocês!