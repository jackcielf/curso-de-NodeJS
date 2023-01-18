const express = require("express"); // Retorna uma funcao
const app = express(); // Peguei a funcao, que esta com uma copia do FrameWork, e coloquei em uma variavel
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/post");

// CONFIGURACOES
// Template Engine
    // Colocando o handlebars como template engine
const hbs = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Body parser - Serve para pegar os dados que vem pelo "methond='POST'" - formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    Post.findAll({ order: [['id', 'DESC']] }).then((posts) => {
        res.render('home', { postes: posts.map(post => post.toJSON()) })
    })
})

app.get("/cadastro", (req, res) => {
    res.render("form"); // Mostrando o arquivo 'form.hanblebars' na rota (detecta automaticamente (por padrao) que o arquivo esta na pasta 'views')
});

/*
app.post("/add", (req, res) => { /* Rota do tipo post, para receber dados do form 
    // "req.body.<name do input>" pega o valor digitado naquele input
    res.send(`O titulo é: ${req.body.inputTitulo} e o conteudo é: ${req.body.inputConteudo}`);
    // res.send("FORMULARIO RECEBIDO!");
});
*/

app.post("/add", (req, res) => {
    Post.create({
        titulo: req.body.inputTitulo,
        conteudo: req.body.inputConteudo
    }).then(() => {
        res.redirect("/"); // Redirecionando o usuario para outra pagina ao executar o form
    }).catch((erro) => {
        res.send(`Falha ao criar post: ${erro}`)
    })
})

app.get('/deletar/:id', (req, res) => {
    Post.destroy({ where: {'id': req.params.id} }).then(() => {
        res.send("Postagem deletada com sucesso!")
    }).catch((erro) => {
        res.send(`Erro ao deletar: ${erro}`)
    })
})

// Ativando server com o Express (DEVE SER SEMPRE A ULTIMA LINHA)
app.listen(8081, () => {
    console.log("Servidor ATIVADO");
});

/*
    - A funcao 'send' só pode ser chamada uma unica vez
    - 
*/