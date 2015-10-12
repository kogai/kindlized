let credential;
let AWSAccessKeyId;
let AWSSecretAccessKey;
let AWSassociatesId;

if (process.env.AWSAccessKeyId || process.env.CI) {
  // heroku用変数
  AWSAccessKeyId = process.env.AWSAccessKeyId;
  AWSSecretAccessKey = process.env.AWSSecretAccessKey;
  AWSassociatesId = process.env.AWSassociatesId;
} else {
  // サービスサーバー用変数
  credential = require('credential');
  AWSAccessKeyId = credential.amazon.AWSAccessKeyId;
  AWSSecretAccessKey = credential.amazon.AWSSecretAccessKey;
  AWSassociatesId = credential.amazon.AWSassociatesId;
}

export default ()=> {
  return {
    endPoint: 'ecs.amazonaws.jp',
    awsId: AWSAccessKeyId,
    awsSecret: AWSSecretAccessKey,
    assocId: AWSassociatesId,
  };
};
