# Como construir uma Api GraphQL com NodeJS parte 2

## Introdução:

Olá novamente, caros devs e devas de todo Brasil, como estamos?

Este artigo é a continuação do tutorial de como construir uma Api GraphQL com NodeJS e ExpressJS, a qual você pode conferir na branch master desse repo! Então, se você ainda não conferiu, vale a pena dar aquela lida e continuar a partir daqui.

Agora, já coloca o café na xícara, abra um terminal e seu editor de códigos favoritos no diretório que estávamos trabalhando (qualquer coisa é só clonar a branch master do repo!) e bora codar =D

## Hello World, ok. E agora?

Começaremos essa próxima parte do artigo entendendo melhor o funcionamento do GraphQL na prática. E isso implica na construção de novas queries e novos resolvers para essas queries. Assim, primeiramente vamos estudar sobre os tipos básicos das variáveis que retornarão das queries, que são: String, Int, Float, Boolean e ID, suportados pela linguagem de schemas do GraphQL.

### Início da receitinha parte 2
 - Após navegar até o diretório do nosso projeto em seu terminal, digite:

              mkdir src

       ou, se estiver usando windows e não estiver no PowerShell

              md src

       mas eu recomendo usar o PowerShell!
 - Em seguida:

              touch src/schemas.js

 - Agora, em seu editor de textos favorito, abra o arquivo que acabou de criar e digite:

              module.exports = `
                     type Query {
                            greetingMessage: String,
                            randomNumber: Float!,
                            rollThreeDice: [Int],
                            isSaturday: Boolean!
                     }
              `

Acabamos de criar 4 schemas que retornarão 4 dos 5 tipos principais. Repare que além dos tipos, existem algumas notações como o !, que representa que aquele campo é obrigatório, exigindo um retorno de um Float, e também a denotação de Array em [Int]. Esses tipos e notações de schema estão todos documentados no site do https://graphql.org/ .

Apesar de termos as queries, para que elas possuam efetivamente o retorno, precisamos dizer para a Api o que ela deverá fazer quando as queries forem solicitadas. Assim, novamente construiremos o resolver para cada query sendo associado pelo nome da variável! Veja:

 - Em um terminal, digite:
              
              touch src/resolvers.js

 - E em seu editor, abra o arquivo resolvers, dentro do diretório src e digite:

              module.exports = {
                     hello: () => 'Hello World!',

                     randomNumber: () => Math.random(),

                     rollThreeDice: () => [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6)),

                     isSaturday: () => (new Date()).getDay() === 6
              }

Aqui estamos apenas mapeando pelos resolvers e dando o devido tratamento para cada possível requisição solicitada.

### O seu novo server.js

No arquivo server.js vamos trocar as variáveis que tinhamos anteriormente pelos módulos que criamos.

 - Em seu arquivo server.js, abaixo do seu último import, vamos importar os módulos que acabamos de criar:

              // resolvers
              const rootValue = require('./src/resolvers');

              // queries
              const queries = require('./src/schemas');

 - Em seguida, apague as variáveis rootValue e schema criadas na primeira parte do nosso tutorial.
 - Por fim, vamos alterar o objeto parâmetro de graphqlHTTP para:

              app.use('/graphql', graphqlHTTP({
                     schema: buildSchema(queries),
                     rootValue,
                     graphiql: true
              }));

## É hora de testar!

 - Caso não esteja com o servidor rodando, abra o terminal e digite:

              yarn start

 - Agora não perca tempo! Corra para o navegador mais próximo e abra http://localhost:3333/graphql e teste!

 - Digite as queries:

              {
                     hello
                     randomNumber
                     rollThreeDice
                     isSaturday
              }

 - Aperte play e veja a mágica!

Nesse momento, sua cabeça já deve estar imaginando todas as infinitas possibilidades para se projetar até aqui. Mas, aparentemente está faltando algo que eu não ensinei mas que é muito necessário na maior parte das funções, certo?

## Passando parâmetros

Para a maior parte de seus problemas, é possível que seja necessário enviar algumas informações para sua API te fornecer uma resposta mais precisa em relação a uma situação que você tem. Parece confuso agora, mas em breve quando estivermos construindo uma aplicação mais complexa.

Por enquanto, utilizarei um exemplo simples para te mostrar como enviar parâmetros para seus endpoints e receber, a partir deles, respostas coerentes.

Suponhamos que você queria rolar dados não só 3 vezes, mas quantas n vezes você quiser. Além disso, não nos restringiremos a dados de 6 lados, mas a dados de quantos n lados quisermos. Assim, teremos que criar uma nova query e passar dois parâmetros para ela: o número de dados jogados e o número de lados dos dados.

 - Em seu arquivo schemas.js, adicione um novo endpoint em seu type Query:

              rollDices(numDices: Int!, numSides: Int!): [Int]

Repare que precisamos definir o tipo de cada variável passada como parâmetro e, além disso, definir se essas variáveis são opcionais ou obrigatórias colocando ou não o !.

 - Em seguida, mapearemos a query com um novo resolver em resolvers.js:

              rollDices: function (args) {
                     const resp = [];

                     for (let i = 0; i < args.numDices; i++) {
                     resp.push(1 + Math.floor(Math.random() * args.numSides))
                     }

                     return resp;
              }

E, novamente, está pronto! Para enviar os parâmetros dentro da query, faça questão de utilizar exatamente o mesmo nome que usou para mapear as variáveis. 

 - Então, ao enviar a nova query, escreva no playground:

              {
                     rollDices(numDices: 3, numSides: 6)
              }

Note que pulei a etapa de iniciar o servidor porque caso ele já esteja rodando, ele atualizou automaticamente devido ao nodemon. Mágico não é mesmo!?

Pronto! Agora você já sabe enviar parâmetros para seus resolvers. Sinta-se livre para criar quais funções você quiser, com quaisquer parâmetros que queira. É muito importante que você treine bastante.

## Próximos passos

Se você chegou até aqui, já sabe iniciar uma Api em NodeJS e ExpressJS em um arquivo server.js. Também sabe agilizar o processo de produção da sua aplicação com nodemon. E hoje, aprendeu a criar queries e passar parâmetros para essas queries. Então, aproveite para inventar suas próprias funções e ir muito além de rolar dados!

### O que falta agora?

Bom, em nossos próximos passos, começaremos efetivamente a criar nosso CRUD. Faremos criações de registros, edições, deleções e os listaremos. Entenderemos a diferença entre queries e mutations (SPOILER ALERT: não há! Mas por convenção e organização, diferenciaremos no código) e criaremos o esqueleto de uma aplicação de verdade. 

O que acha de continuar acompanhando a série de artigos desse tutorial e aprender a construir a Api de um Blog? Então continue lendo e não deixe de participar deixando seus comentários e dúvidas!

## Referências:

 - https://graphql.org/graphql-js/basic-types/
 - https://graphql.org/graphql-js/passing-arguments/