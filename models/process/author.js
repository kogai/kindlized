var saveAuthor = require('../../models/exec.authors');

module.exports = function (req, res) {
    saveAuthor(req.body.authorRegist);
    res.redirect( 303, '/');
}