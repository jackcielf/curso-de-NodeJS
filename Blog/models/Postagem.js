const db =  require('mongoose');
const Schema = db.Schema;

const postagemSchema = new Schema({
	titulo: {
		type: String,
		reuired: true
	},
	slug: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	conteudo: {
		type: String,
		required: true
	},
	categoria: {
		type: Schema.Types.ObjectId,
		ref: 'categorias',
		required: true
	},
	data: {
		type: Date,
		default: Date.now()
	}
});

db.model('postagens', postagemSchema);