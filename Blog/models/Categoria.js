const db = require('mongoose');
const Schema = db.Schema;

const categoriaSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

db.model('categorias', categoriaSchema);

