// Guardando o modulo de soma em uma variavel
var SomaFunc = require("./somar"); // Ponto e barra para indicar que o arquivo esta a mesma pasta
var SubFunc = require("./subtrair"); // A extensao '.js' nao é obrigatoria
var MultiFunc = require("./multiplicacao");
var DivFunc = require("./divisao")

console.log(SomaFunc(5,2));
console.log(SubFunc(5,2));
console.log(MultiFunc(5,2));
console.log(DivFunc(5,2));