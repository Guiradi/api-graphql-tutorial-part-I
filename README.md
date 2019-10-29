# Como construir uma Api GraphQL com NodeJS

## Introdução:
Construir um sistema pode ser mais complexo do que parece ser. Afinal, você tem usuários para gerenciar, dados para salvar, ações para realizar e respostas para entregar, estou certo?
Bem, se pelo menos um desses problemas que elenquei está atormentando você, então veio para o tutorial correto!

Aqui procuro facilitar para você uma receitinha básica para iniciar qualquer projeto que seguirá a mesma stack de desenvolvimento. Destacando bastante para facilitar suas buscas futuras, então favorita esse link para não perder a receitinha!

PS(aos veteranos de código): Peço licença para os programadores mais experientes para fugir um pouco de algumas boas práticas de código, pois o intuito deste tutorial é iniciar e auxiliar nossos companheiros menos experientes no maravilhoso mundo de GraphQL! Caso algo o incomode, deixe um comentário com dicas e sugestões (nós adoramos!).

### Mas, por que GraphQL?
Ainda está confuso sobre o que é esse conceito e por que colocá-lo em sua aplicação? Confira o vídeo de Gabriel Cardoso, dev da ez.devs, no canal da empresa: https://www.youtube.com/watch?v=0MfMYPvimYo&trk= 

### E por onde eu começo?
Para dar os primeiros passos com a API, é importante ter bastante conhecimento nas mais recentes versões de javascript (ou ECMAScript, chique demais), instalar o NodeJS em sua máquina e em seguida, instalar gerenciador de dependências muito rápido, confiável e seguro (e eles se asseguram disso firmemente), o YARN!

 - Com o NodeJS (https://nodejs.org/) instalado em sua máquina, digite em um terminal:
       
              npm i yarn -g

Caso esteja com dúvidas ou queira saber mais sobre o pacote, leia a documentação em https://yarnpkg.com/.

Caso prefira fazer todo o projeto utilizando o npm, não se preocupe, coloquei os dois scripts na receitinha, disponha!

## Ready, set, GO

Após a instalação dos requisitos, leia Node e yarn, o primeiro passo para construir sua API em NodeJS será iniciar um projeto NodeJS (UAU).

### Mas como eu faço isso?

Parece até bobo de tão simples, mas toda vez que eu inicio um projeto novo eu percorro uns 3 tutoriais até me lembrar como eu realmente fiz isso, então anota a receitinha:
 - Escolha/Crie um diretório em seu computador onde trabalharemos com a API.
 - Abra um terminal de sua preferência e navegue até o diretório escolhido.
 - (Opcional, mas recomendado) Inicie o Git nesse repositório para trabalhar com versionamento em seu código, é importante manter suas versões caso se arrependa ou até queira observar o que você foi alterando conforme foi adicionando features.
 - Digite no terminal:
 
        yarn init -y
 - ou
 
        npm init -y (caso não tenha seguido meus passos anteriores!)

### Pronto! Muito simples, não é mesmo? Porém... deu certo?

Verifique se no diretório criado agora existe um arquivo package.json e abra-o.
Em seguida, observe que nesse arquivo contém informações sobre seu projeto, edite caso queira incluir informações adicionais de seu interesse no projeto.

Tudo certo? Então, a partir de agora, instalaremos alguns pacotes que nos ajudarão com alguns códigos prontos para facilitar nosso trabalho durante a construção da API.
 - Para isso, digite no terminal:
 
        yarn add express graphql express-graphql --save
 - ou
    
        npm install express graphql express-graphql --save

Esse comando incluirá em seu projeto um diretório denominado node_modules, que possuirá os pacotes que acabamos de instalar.

### Não esqueça que é sempre bom se preocupar com sua agilidade

Então, para que seja possível um desenvolvimento mais fluido, sem precisar ficar reiniciando o seu servidor toda vez que alterar o código, instalaremos um outro pacote chamado Nodemon:
 - Digite no terminal:
 
        yarn add nodemon -D
 - ou
 
        npm install --save-dev nodemon

Então, no arquivo package.json, você incluirá a seguinte linha:
 - Inclua no arquivo package.json como uma nova prop:

        "scripts": {
            "start": "nodemon server.js"
        }

### Versione muito, mas tome cuidado

Para que os pacotes e as suas variáveis de ambiente não subam para o Git, criaremos no projeto um arquivo .gitignore e incluiremos essas linhas:
 - Digite no terminal (ou crie um arquivo .gitignore e abra-o em um editor):
 
        touch .gitignore
        
 - Em seguida, inclua as linhas:
 
        node_modules
        .env
        
 - Salve-o!

### É hora de codar!

Agora, para desbravar nossa primeira aventura no mundo das APIs GraphQL, iniciaremos com algo simples, que possuirá um único arquivo, que aqui chamarei de server.js (esse nome é padrão em diversas arquiteturas, mas você poderá dar o nome que quiser para ele!). Repare que no script que incluimos em package.json diz para o nodemon abrir esse arquivo, então caso você vá utilizar outro nome, lembre-se de alterar no arquivo de pacotes também!

Para o nosso próximo passo, abra o projeto em seu editor de códigos favoritos e bora codar :)

#### Imports
 - Comecemos importando o express, o express-graphql (que servirá nossa aplicação) e o construtor de schemas do graphQL:

              const express = require('express');
              const graphqlHTTP = require('express-graphql');
              const { buildSchema } = require('graphql');

#### Schemas
 - Em seguida, utilizaremos o método buildSchema para criar o schema da nossa API. Como estamos na primeira parte do tutorial, iniciaremos com algo simples:

              const schema = buildSchema(`
                     type Query {
                            hello: String
                     }
              `);

Uma simples query denominada hello e que retornará uma string. Observe que, uma vez escolhido o nome de algum schema, você precisa criar um resolver correspondente de mesmo nome!

(Obs: caso não tenha feito o dever de casa, aqui vai uma segunda chance de conferir o vídeo do Cardoso explicando tudo sobre GraphQL: https://www.youtube.com/watch?v=0MfMYPvimYo&trk=)

#### Resolvers
 - O próximo passo, então, é construir nosso resolver!

              const rootValue = {
                     hello: () => 'Hello World!'
              };
Repare que, não quis chamar a variável de resolver e isso tem uma explicação muito simples que em breve trarei para vocês, mas sinta-se livre para tornar o código o mais limpo e legível da maneira que achar mais adequada para seu projeto, só não esqueça de alterar nas outras partes do (meu) código também!

O resolver tratará os seus dados e, caso tenha sido definido previamente (como foi o caso), possivelmente retornará algo. No caso, nosso resolver apenas responderá: "Hello World!"

#### Setando o servidor
 - Definidos os schemas e os resolvers, é hora de configurar e rodar o servidor:

              const app = express();

              app.use('/graphql', graphqlHTTP({
              schema,
              rootValue,
              graphiql: true
              }));

              app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));

Repare que estou servindo essa API na rota /graphql, mas você também pode alterar para a rota que preferir.

Observe também, nesse momento, que as propriedades do objeto que passamos como parâmetro para o método graphqlHTTP possuem nome exatamente igual às variáveis definidas anteriormente, e, por isso, são mapeados pelo JS, o que pra mim facilita bastante tanto na escrita quanto na leitura.

Além disso, é importante destacar que a propriedade graphiql está setada para true, o que significa que será possível utilizar um "playground" do graphql para testar nossas queries enquanto as construimos, na rota e porta que escolhemos servir nossa API.

## Rodando e testando
Está tudo nos conformes? Seguiu todos os passos corretamente? Então é hora de testar!

 - Em um terminal, abra o diretório que contém sua API e digite:

              yarn start

Uma mensagem, que nós mesmos setamos, avisará que o servidor já está rodando. Então, está no ar! Abra um navegador em http://localhost:3333/graphql e teste sua query digitando a:

              {
                     hello
              }

 - Em seguida, clique em play e voilà!

### GG WP

Meus parabéns! Acabou de concluir nosso primeiro tutorial para a construção de uma API em GraphQL. Em breve nós daremos o segundo passo em nossa jornada, aprendendo a realizar operações realmente úteis! Buscaremos informações em listas, filtraremos campos, aprenderemos a passar parâmetros para nossas queries e muito mais! 

Até o fim de 4 etapas do nosso tutorial você já saberá montar um CRUD completo e, consequentemente, resolverá os problemas listados e muitos outros!

Caso tenha tido alguma dificuldade durante o projeto, dá uma olhadinha no código do Github ou envie um e-mail para nós. Além disso, não deixe de dar seu feedback, afinal, só assim cresceremos juntos!

## Referências:

 - https://graphql.org/code/#javascript
 - https://graphql.org/graphql-js/running-an-express-graphql-server/
 - https://yarnpkg.com/en/docs