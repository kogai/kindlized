var modelUser       = require ('user/lib/modelUser');
var comparePassword = require ('user/lib/comparePassword');
var hashPassword    = require ('user/lib/hashPassword');
var schemaUser      = modelUser.schema;

schemaUser.methods.comparePassword = comparePassword;
schemaUser.pre( 'save', hashPassword );

module.exports = modelUser;
