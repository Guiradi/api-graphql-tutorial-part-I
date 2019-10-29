# Como construir uma Api GraphQL com NodeJS

### Passos anteriores:
 - Instalar o nodeJS
 - Instalar o yarn

O primeiro passo para construir sua API em NodeJS será iniciar um projeto NodeJS (beleza Guilherme, entendi).

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
