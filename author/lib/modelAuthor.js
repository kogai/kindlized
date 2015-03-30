var makeModel = require('common/makeModel');

var AuthorSchema = {
	name: {
		type: String,
		index: {
			unique: true
		}
	},
	wroteBooks: {
		lastModified: Date,
    	isChanged: Boolean,
		recent: {
			publicationBooks: Array,
			publicationNumber: Number
		},
		current: {
			publicationBooks: Array,
			publicationNumber: Number
		}
	},
	lastModified: Date
};

module.exports = new makeModel('Author', AuthorSchema);
