module.exports = function( credentialName ){
   var var credential;
   if (process.env.HEROKU || process.env.CI ) {
      credential = process.env;
   } else {
      credential = require('credential');
   }
   credentialName = credential[ credentialName ];
   return newModel;
};
