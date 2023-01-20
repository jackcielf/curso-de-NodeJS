// IMPORTANDO MÓDULOS
const db = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const app = express();
const path = require('path'); // Este modulo serve para manipular pastas
const admin = require('./routes/admin'); // Importando as rotas (somente importar não é o suficiente para serem utilizadas)
const flash = require('connect-flash');

// CONFIGURAÇÕES
	// Sessão
	app.use(session({
		secret: "criandosessao", /* É importante que esse parâmetro seja bem difícil de desvendar */
			resave: true,
		saveUninitialized: true
	}));
	app.use(flash());
	// Middleware
	app.use((req, res, next) => {
		res.locals.success_msg = req.flash("success_msg"); // Criando variáveis globais (o nome desta é 'success_msg') 
		res.locals.error_msg = req.flash("error_msg"); // Essas variáveis glovais estão sendo criadas para mostrar uma mensagem após o usuário ter criado um novo post ou dado erro 
		next(); // Para encerrar o Middleware é IMPORTANTE sempre colocar essa função 
	});
	// Body-parser
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	// Handlebars
	const hbs = handlebars.create({ defaultLayout: 'main', runtimeOptions: { allowProtoPropertiesByDefault: true} });
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	// Mongoose
	db.Promise = global.Promise; // Evita possíveis erros de conexão (não obrigatório, mas recomendado)
	db.set('strictQuery', true); // Evita possíveis erros de conexão (não obrigatório, mas recomendado)
	db.connect("mongodb://0.0.0.0:27017/blogapp")
	.then(() => console.log("CONECTADO AO MONGODB!"))
	.catch((err) => console.log(`ERRO: ${err}`));

	// Public
	app.use(express.static(path.join(__dirname, 'public')));
	
// ROTAS
	// Chamando a rota para ser utilizada
	app.use('/admin', admin);


// OUTROS
const PORT = 8081;
app.listen(PORT, () => console.log("Server ATIVADO!"));

