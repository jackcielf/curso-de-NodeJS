var http = require("http"); // Importando o modulo 'http'

// Startando o servidor e sua porta
// http.createServer().listen(8081);

http.createServer(function(req, res) {
    res.end("Mostrando uma mensagem na tela"); // Mostra uma mensagem na tela
}).listen(8081);

console.log("Servidor ATIVADO");

/*
    - O FrameWork 'Express' faz tudo isso automaticamente
    - Ele é uma FrameWork monimalista (simples)
    - FrameWorks mais robustos e completos sao chamados de 'FullStack'
    - O Express é um FrameWork orientado a rotas
*/