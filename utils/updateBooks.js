var moment = require('moment-timezone');
var Batch = require('./Batch');

var updateBooks = new Batch({
  limit: process.argv[2] || process.env.LIMIT,
  conditions: {
    "modifiedLog.InspectKindlizeAt": {
      $exists: false
    }
  },
  update: {
    "modifiedLog.AddBookAt": moment("2015-06-01"),
    "modifiedLog.InspectKindlizeAt": moment("2015-06-01"),
    "modifiedLog.AddASINAt": moment("2015-06-01"),
    "modifiedLog.UpdateUrlAt": moment("2015-06-01")
  },
  Model: require('models/Book')
});
updateBooks.run();
