var fetchParentASIN = require('librarian/lib/fetchParentASIN');
var inspectBookList = require('librarian/lib/inspectBookList');
var modifyDetailUrl = require('librarian/lib/modifyDetailUrl');
var inspectNewRelease = require('librarian/lib/inspectNewRelease');
var addNewRelease = require('librarian/lib/addNewRelease');

module.exports = {
  fetchParentASIN: fetchParentASIN,
  inspectBookList: inspectBookList,
  modifyDetailUrl: modifyDetailUrl,
  inspectNewRelease: inspectNewRelease,
  addNewRelease: addNewRelease
};
