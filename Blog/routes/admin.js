const db = require('mongoose');
const express = require('express');
const router = express.Router();
require('../models/Categoria'); // Chamando o model
const Categoria = db.model('categorias');
require('../models/Postagem');
const Postagem = db.model('postagens')

router.get('/', (req, res) => {
	res.render('admin/index')
});

router.get('/post', (req, res) => {
	res.send("Esta é a pagina de posts")
});

// ROTA DE LISTAGEM DE CATEGORIAS
router.get('/categoria', (req, res) => {
	Categoria.find().sort({ date:'DESC' }).then(categoria => {
		res.render('admin/categoria', { categoria: categoria }); /* O 'categoria' após os dois pontos se refere ao model categoria */
	}).catch(err => {
		req.flash("error_msg", "Houve um erro ao listar as categorias, recarreque a página!");
		res.redirect('/admin');
	});
});

// ROTA DO FORM DE NOVA CATEGORIA
router.get('/categoria/add', (req, res) => {
	res.render('admin/addCategoria')
});

// ROTA PARA ADICIONAR NOVA CATEGORIA
router.post('/categoria/nova', (req, res) => {
	var erros = [];

	if (!(req.body.nome) || req.body.nome == undefined || req.body.nome == null) {
		erros.push({ texto: "Nome inválido" })
	}

	if (!(req.body.slug) || req.body.slug == undefined || req.body.slug == null) {
		erros.push({ texto: "Slug inválido" })
	}

	if (req.body.nome.length < 2) {
		erros.push({ texto: "Nome da categoria muito pequeno" })
	}

	if (erros.length > 0) {
		res.render("admin/addcategoria", { erros: erros })
	} else {
		// Adicionando a nova categoria
		const novaCategoria = {
			nome: req.body.nome,
			slug: req.body.slug
		}

		new Categoria(novaCategoria)
		.save().then(() => {
			req.flash("success_msg", "Categoria criada com sucesso!")
		
			res.redirect('/admin/categoria')
		}).catch((err) => {
			req.flash("error_msg", "Houve um erro ao salvar categoria, tente novamente!")
			res.redirect('/admin')
		})
	}
});

// EDIÇÃO DA CATEGORIA
router.get('/categoria/editar/:id', (req, res) => {
	Categoria.findOne({ _id: req.params.id }).then(categoria => {
		res.render('admin/editarCategoria', { categoria: categoria });
	}).catch(err => {
		req.flash("error_msg", "Essa categoria não existe!");
		res.redirect('admin/categoria');
	});
});

// DELETAR CATEGORIA
router.post('/categoria/deletar', (req, res) => {
	Categoria.remove({ _id: req.body.id }).then(() => {
		req.flash('success_msg', "Categoria deletada com sucesso!");
		res.redirect('/admin/categoria');
	}).catch(err => {
		req.flash('error_msg', "Houve um erro ao deletar categoria!");
		res.redirect('/admin/categoria');
	})
});

// ROTA DE LISTAGEM DE POSTAGENS
router.get('/postagem', (req, res) => {
	Postagem.find().populate("categoria").sort({ data: 'DESC' }).then(postagens => {
		res.render('admin/postagem', { postagem: postagens })
	}).catch(err => {
		req.flash('error_msg', "Houve um erro ao listar as categorias, recarreque a página!");
		res.redirect('/admin');
	})
});

// ROTA DO FORM DE NOVA POSTAGEM
router.get('/postagem/add', (req, res) => {
	Categoria.find().then(categoria => {
		res.render('admin/addPostagem', { categoria: categoria })
	}).catch(err => {
		req.flash('error_msg', "Houve um erro ao carregar formulário!");
		res.redirect('/admin');
	})
});

// ROTA PARA ADICIONAR NOVA POSTAGEM
router.post('/postagem/nova', (req, res) => {
	var erros = [];

	if (!(req.body.titulo) || req.body.titulo == undefined || req.body.titulo == null) {
		erros.push({ texto: "Título inválido" })
	}

	if (!(req.body.slug) || req.body.slug == undefined || req.body.slug == null) {
		erros.push({ texto: "Slug inválido" })
	}

	if (!(req.body.descricao) || req.body.descricao == undefined || req.body.descricao == null) {
		erros.push({ texto: "Descrição inválida" })
	}

	if (!(req.body.conteudo) || req.body.conteudo == undefined || req.body.conteudo == null) {
		erros.push({ texto: "Conteúdo inválido" })
	}

	if (req.body.categoria == "0") {
		erros.push({ texto: "Categoria inválida, registre uma categoria" })
	}

	if (erros.length > 0) {
		res.render('admin/addPostagem', { erros: erros })
	} else {
		const novaPostagem = {
			titulo: req.body.titulo,
			slug: req.body.slug,
			descricao: req.body.descricao,
			conteudo: req.body.conteudo,
			categoria: req.body.categoria
		}

		new Postagem(novaPostagem).save().then(() => {
			req.flash('success_msg', "Postagem criada com sucesso!");
			res.redirect('/admin/postagem');
		}).catch(err => {
			req.flash('error_msg', "Houve um erro ao criar postagem, tente novamente!");
			res.redirect('/admin/postagem');
		})
	}
});

// EDIÇÃO DA POSTAGEM
router.get('/postagem/editar/:id', (req, res) => {
	res.render('admin/editarPostagem')
});

// DELETAR POSTAGEM
router.get('/postagem/deletar/:id', (req, res) => {
	// Forma de deletar NÃO SEGURA
	Postagem.remove({ _id: req.params.id }).then(() => {
		req.flash('success_msg', "Postagem deletada com sucesso");
		res.redirect('/admin/postagem')
	}).catch(err => {
		req.flash('error_msg', "Houve um erro ao apagar postagem");
		res.redirect('/admin/postagem');
	})
})

module.exports = router;