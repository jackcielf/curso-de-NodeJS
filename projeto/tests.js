const express = require("express"); // Retorna uma funcao
const app = express(); // Peguei a funcao, que esta com uma copia do FrameWork, e coloquei em uma variavel

/*
// Criando rotas e mostrando mensagens na tela
app.get("/", (req, res) => {
    res.send("Mostrando mensagem com Express");
});

app.get("/sobre", (req, res) => {
    res.send("Você acessou a porta 'sobre'");
});

app.get("/blog", (req, res) => {
    res.send("Acessou a porta 'blog'");
});

// Recebendo parametros pela URL '/:params'
app.get("/ola/:cargo/:nome", (req, res) => { 
    // res.send(req.params); // Mostra todos os parametros que foram passados pela URL
    res.send("<h1>Ola " + req.params.nome + " seu cargo é " + req.params.cargo + "</h1>"); // Especificando o parametro que quero mostrar
});
*/

// Abrindo um arquivo (HTML) na rota
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html"); // '__dirname' retorna o diretorio padrao da aplicacao, que no caso é: 'C:\Users\jacks\OneDrive\Área de Trabalho\SitesNODE\projeto'
});

// Ativando server com o Express (DEVE SER SEMPRE A ULTIMA LINHA)
app.listen(8081, () => {
    console.log("Servidor ATIVADO");
});

/*
    - A funcao 'send' só pode ser chamada uma unica vez
*/