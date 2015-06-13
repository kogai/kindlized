"use strict";

var amazon = require('common/makeCredential')('amazon');
var CONSTANT = {
  INTERVAL: 500,
  PAGING_LIMIT: 10,
  periodicalDay: 1,
  PERIODICAL_DAY: 1,
  SALT_WORK_FACTOR: 10,
  OPERATION_CONFIG: {
  	endPoint: 'ecs.amazonaws.jp',
  	awsId: amazon.AWSAccessKeyId,
  	awsSecret: amazon.AWSSecretAccessKey,
  	assocId: amazon.AWSassociatesId
  },
  mail: {
    info: 'info@kindlize.it'
  },
  LIMIT: {}
};

if(process.env.NODE_ENV === "development"){
  CONSTANT.LIMIT.BOOK = 5;
  CONSTANT.LIMIT.AUTHOR = 1;
  CONSTANT.LIMIT.INTRO = 24;
}else{
  CONSTANT.LIMIT.BOOK = 300;
  CONSTANT.LIMIT.AUTHOR = 100;
  CONSTANT.LIMIT.INTRO = 24;
}

module.exports = CONSTANT;
