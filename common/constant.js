var amazon = require('common/makeCredential')('amazon');

module.exports = {
  interval: 500,
  INTERVAL: 500,
  retryInterval: 1000 * 60,
  periodicalDay: 1,
  PERIODICAL_DAY: 1,
  _id: "54a10f0f0aa5f89d434cb2c9",
  SALT_WORK_FACTOR: 10,
  limit: 300,
  LIMIT: {
    BOOK: 300,
    AUTHOR: 100,
    INTRO: 24
  },
  mail: {
    info: 'info@kindlize.it'
  },
  OPERATION_CONFIG: {
  	endPoint: 'ecs.amazonaws.jp',
  	awsId: amazon.AWSAccessKeyId,
  	awsSecret: amazon.AWSSecretAccessKey,
  	assocId: amazon.AWSassociatesId
  }
};
