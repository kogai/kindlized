var makeModel		 = require('../../common/makeModel');
var bookrSchema	= {
	status			: String,
	ASIN			: Array,
	AuthorityASIN 	: Array,
	EAN				: Array,
	author			: Array,
	title			: Array,
	publisher		: Array,
	publicationDate : Array,
	price			: Array,
	url				: Array,
	images			: String,
	lastModified	: Date,
	is_kindlized	: Boolean
};

module.exports = new makeModel( 'BookList', bookrSchema );
