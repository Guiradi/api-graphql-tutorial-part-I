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

### Certo, lembro de termos estudado String, Int, Float e Boolean, mas ID????
 
Muito bem, o GraphQL entende que por ID estamos utilizando um identificador para aquele registro e, por isso, aceita números, símbolos e palavras nesse type.

### Ok, o ID está na documentação, mas type Post?????

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
