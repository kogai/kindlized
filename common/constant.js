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
  CONSTANT.LIMIT.INTERVAL_TWEET = 1000; // 1sec
}else{
  CONSTANT.LIMIT.BOOK = 100;
  CONSTANT.LIMIT.AUTHOR = 30;
  CONSTANT.LIMIT.INTRO = 24;
  CONSTANT.LIMIT.INTERVAL_TWEET = 1000 * 60 * 10; // 10min
}

module.exports = CONSTANT;
export const PERIODICAL_DAY = PERIODICAL_DAY;
