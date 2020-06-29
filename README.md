# Como construir uma Api GraphQL com NodeJS parte 4

Hoje é, enfim, a conclusão de uma saga para aprender muito sobre o GraphQL. Você já é um vencedor por chegar até aqui!

## Introdução:

Que grande prazer encontrá-los novamente,, caros devs e devas de todo Brasil! Como estão?

Este artigo faz parte de uma série de artigos sobre como construir uma API GraphQL com NodeJS e ExpressJS, que você pode acompanhar nos links: 
       - [Parte 1](https://ezdevs.com.br/como-construir-uma-api-graphql-com-nodejs/)
       - [Parte 2](https://ezdevs.com.br/como-construir-uma-api-graphql-com-nodejs-parte-2/)
       - [Parte 3](https://ezdevs.com.br/como-construir-uma-api-graphql-com-nodejs-parte-3/)

Se você ainda não conferiu os artigos, vale a pena dar uma conferida, pois com as partes anteriores já é possível estruturar um blog completo! Estamos criando, atualizando e deletando posts! No entanto, é preciso ressaltar que um blog não é feito apenas de posts, não é verdade? Além disso, o GraphQL vai tornando-se poderoso, a partir do momento em que se descobre todo seu potencial como linguagem, respeitando padrões do design de software, como o SOLID!

### Início da receitinha parte 4
 - Abra o projeto finalizado na parte 3 desse tutorial (ou clone essa [pasta](https://github.com/Guiradi/Tutorial-API-GraphQL/tree/master/api-graphql-tutorial-part-III)) no seu editor de textos favorito e começaremos escrevendo os nossos novos schemas para comentários e curtidas!

 - Em src/schemas.js, começaremos inserindo um novo type para representar uma classe de comentários, que terá um id (identificador) e um Content (conteúdo do comentário). Além disso, incluiremos o type post nos comentários para que seja possível acessar o post em que o comentário foi escrito:

              type Comment {
                     id: ID!
                     content: String
                     post: Post!
              }

Em seguida, criaremos um type Like para as curtidas que tanto os comentários quanto os posts poderão receber. Portanto esse type precisa ter um identificador (id), uma propriedade que especifique seu tipo (type), e o objeto que ele se relaciona (post ou comment). Mas qual a melhor maneira de implementar um objeto que não sabemos o que pode ser?

## Union Types

Os union types são muito parecidos com interfaces, mas que não precisam especificar nenhum campo em comum específico entre os types unidos.

 - Para especificar para a query que apresentaremos um objeto curtido que pode tanto ser um post quanto um comentário, incluiremos o union no nosso src/schemas.js:

              union LikedObject = Post | Comment
       
 - Assim, ao criar o type Like, podemos utilizar essa união e mostrar que ela é obrigatória na hora de especificar o objeto curtido:

              type Like {
                     id: ID!
                     type: String!
                     likedObject: LikedObject!
              }

 - Como o Like é uma estrutura pertencente à posts e comentários e o comentário é uma estrutura pertencente ao post, podemos incluir essas relações nos types e nosso schema ficará dessa forma:

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
                     post: Post!
                     likes: [Like]
              }

              union LikedObject = Post | Comment

              type Like {
                     id: ID!
                     type: String!
                     likedObject: LikedObject!
              }

Observe que em post, podemos ter vários comentários e vários likes, portanto essas estruturas estão inclusas como arrays dentro dos objetos pais. Também é importante ressaltar que em comentários, podemos ter muitos likes, logo sua estrutura também é um array, no entanto um comentário pode ser atribuído apenas a um único post, portanto representando um único objeto de post.

## Pratique!

Veremos agora um exemplo de busca eficiente em uma API GraphQL, mas dessa vez não desenvolveremos a lógica da aplicação, já que o importante nessa parte do tutorial é desenvolver e praticar suas habilidades com o graphQL em si. Portanto, para que seja possível testar isso em prática, é importante que as relações das tabelas ou objetos (no caso de bancos não relacionais) estejam corretamente inseridas e, em cada contexto, corretamente associada.

 - Em uma situação onde queremos buscar os comentários com seus likes em dado post, construíriamos uma query em src/schemas.js da forma como já construímos:

              type Query {
                     post(id: ID!): Post!
              }

 - Para efetuar essa busca, enviaremos o json da requisição da seguinte forma:

              {
                     post(id: "id_do_post") {
                            comments {
                                   id
                                   content
                                   likes {
                                          id
                                          type
                                   }
                            }
                     }
              }
       
Dessa forma, apenas com o id da postagem, conseguimos buscar da nossa API o id e conteúdo de cada comentário feito naquele post e, além disso, os likes de cada comentário.
Mas e o caminho reverso? E se de alguma forma nós obtivéssemos o id com like e gostaríamos de acessar um dos tipos da união LikedObject?

 - Em uma suposta query para buscar o like, como: 

              type Query {
                     like(like_id: ID!): Like!
              }

 - O json da requisição pode ser construído da seguinte forma:

              {
                     like(like_id: "id_do_like") {
                            likedObject {
                                   id
                                   content
                                   likes {
                                          id
                                   }

                                   __typename
                                   ... on Post {
                                          title
                                          author
                                          created_at
                                          comments {
                                                 id
                                                 content
                                                 likes {
                                                        id
                                                 }
                                          }
                                   }
                            }
                     }
              }

E assim obteríamos uma busca precisa que retorna muitas informações sobre o objeto curtido e quem se preocupará em enviá-lo será o resolver like(like_id). A propriedade __typename solicitada na requisição é inserida pelo graphQL que identificará na resposta o tipo de objeto que retornou em sua busca, podendo vir "Post" ou "Comment" no caso acima. Além disso, incluimos o condicional para que, quando a requisição retornar um tipo Post ela possa trazer, além das informações em comum, as informações específicas de um type Post.

É claro que estes exemplos ainda estão bem vazios e que um comentário, muito provavelmente, não será constituído apenas por um conteúdo, mas também apresentará um autor e uma data de criação, assim como o post. Mas se uma estrutura de código se repete no código e, provavelmente, continuará se repetindo conforme as relações forem sendo construídas e relacionadas, será necessário construir uma abstração do código que signifique uma informação coerente e melhore a legibilidade e organização.

## Então, utilize fragments!

Fragments são construções que permitem que você evite repetição de código tanto na hora de construir as queries quanto na hora de buscá-las, tornando seu código mais conciso e legível.

 - No caso citado acima, para ler uma estrutura de posts coerente (id, título, conteúdo e autor) podemos utilizar um "atalho", o fragment, evitando a repetição do código na busca:

              fragment defaultPostStructure on Post {
                     id
                     title
                     content
                     author
              }
              
 - E no momento de realização da busca, podemos escrever o json da requisição da seguinte maneira:
 
              {
                     post(id: "id_do_post") {
                            ... defaultPostStructure
                            created_at
                            likes {
                                   id
                            }
                            comments {
                                   id
                                   content
                                   likes {
                                          id
                                   }
                            }
                     }
              }

É importante lembrá-lo que este exemplo ainda é pouco abrangente, mas a medida que sua aplicação for tornando-se maior e mais robusta, as queries começarão a ficar mais trabalhosas e confusas. Além disso, pode ser que em dado momento você precise escrever a busca de alguns posts em uma mesma query, como no exemplo a seguir:

 - Em uma requisição json, você precisa buscar pelos posts de id = 1 e id = 2 e pensaria em algo como:

              {
                     post(id: "1") {
                            ... defaultPostStructure
                     }
                     post(id: "1") {
                            ... defaultPostStructure
                     }
              }

O que na verdade seria encarado como um erro pelo servidor, já que a requisição exige um mesmo campo com diferentes argumentos. A solução para problemas desse tipo seria dar "apelidos" ou aliases para essas requisições.

 - Uma requisição json com aliases ficaria mais ou menos da seguinte forma:

              {
                     firstPost: post(id: "1") {
                            ... defaultPostStructure
                     }
                     secondPost: post(id: "1") {
                            ... defaultPostStructure
                     }
              }

E em resposta, a API graphQL apelidará os objetos como "firstPost" e "secondPost" ao invés de trazer uma "incoerência" que seriam duas propriedades com mesmo nome.

## Próximos passos

Bom, tendo em vista que o assunto principal do nosso "season finale" de tutorial foi completamente focado em discussões mais avançadas sobre a API GraphQL, seria interessante que seus próximos passos sejam o estudo da API em si, aprendendo a conectá-la com um banco de dados, tratar seus erros e formatar os objetos para que a requisição contenha todos os campos e relações que possam ser solicitados.
Para isso existem muitos caminhos a serem buscados, muitos frameworks e ORM's a serem explorados e uma infinidade de fatores a ser levados em consideração. Mas sinta-se iluminado, pois você já possui muitas ferramentas para se tornar um grande mestre em API's GraphQL no futuro, jovem Padawan!
Se quiser ver um pouco mais sobre API's NodeJS e como efetuar a conexão com um banco de dados, não deixe de conferir a nova saga de construção de API que o Ítalo iniciou [nessa publicação!](https://ezdevs.com.br/introducao-a-orm-no-node-js-com-sequelize/)
Por fim, queria agradecer a atenção nessa jornada para desvendar um pouco sobre o poderoso graphQL! Não deixe de acompanhar os conteúdos da ez.devs no blog e [no canal do Youtube](https://www.youtube.com/watch?v=QJLEuIpbWd0)!

Até a próxima jornada =D