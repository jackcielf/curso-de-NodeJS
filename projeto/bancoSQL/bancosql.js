const Sequelize = require("sequelize");

// Configurando conexao com o banco de dados
const sequelize = new Sequelize('usuario', 'root', 'jakkifx', {
    host: 'localhost',
    dialect: 'mysql'
});

// Models
// Criando as tabelas com sequelize
const Postagem = sequelize.define('postagens', {
    titulo: { /* nome da coluna */
        type: Sequelize.STRING /* tipo da coluna */
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

Postagem.create({
    titulo: "Um titulo qualquer",
    conteudo: "Aqui é o conteudo!"
});

Usuario.create({
    nome: "Jack",
    sobrenome: "a Lenda!",
    idade: 17,
    email: "jackalenda@gmail.com"
})

/*
// Fazendo a sincrnizacao e, de fato, criando as tabelas
Postagem.sync({force: true}); // O objeto 'force' serve para garantir que a tabela será criada
Usuario.sync({force: true});
*/

/*
    - Quando for adicionar dados a tabela, APAGUE OS METODOS 'sync', pois se nao ocorrerá um erro 
    na adicao dos dados
    - De preferencia, coloque o nome das tabelas no PLURAL

*/

// Esse bloco de codigo e somente de verificacao, portanto pode ser apagado
sequelize.authenticate().then(() => {
    console.log("Conectado com SUCESSO!")
}).catch((erro) => {
    console.log(`FALHA ao conectar: ${erro}`)
});

/*
    - A funcao 'authenticate' verifica se a conexao foi realizada com sucesso
    - Como a funcao 'authenticate' serve, neste caso, somente verifica a conexao,
    ela pode ser apagada caso ja tenha certeza que a conexao foi feita
    - Resumindo a funcao 'authenticate' é OPCIONAL
    - Caso a conexao seja feita com sucesso a funcao 'then' será executada,
    caso contrario, se houver algum erro ao conectar, a 'catch' será executada
    (funciona como um if...else)
    - O 'then' e o 'catch' tem relacao com a programacao assincrona
*/