const db = require("mongoose");

// Fazendo a conexão com o banco de dados do mongo
db.Promise = global.Promise; // Evita possíveis erros de conexão (não obrigatório, mas recomendado)
db.set('strictQuery', true); // Evita possíveis erros de conexão (não obrigatório, mas recomendado)
db.connect("mongodb://0.0.0.0:27017/aprendendo")
.then(() => console.log("MongoDB Conectado..."))
.catch(err => console.log(`ERRO ao conectar: ${err}`));

// Model - Usuários (Collections)
const UserSchema = db.Schema({
    nome: {
        type: String,
        require: true /* Define se este campo é obrigatório */
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    }
})

// Nome da collection que será criada e nome do model
db.model('usuarios', UserSchema);

// Adicionando un novo usuário manualmente
const newUser = db.model('usuarios');
new newUser({
    nome: "Joao",
    email: "joao@gmail.com",
    idade: 15
}).save() /* usado para salvar o usuário no db */
.then(() => console.log("Usuário salvo com sucesso!"))
.catch(err => console.log(`Erro: ${err}`));