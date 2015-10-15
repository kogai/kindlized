export default ()=> {
  return {
    endPoint: 'ecs.amazonaws.jp',
    awsId: process.env.KINDLIZED_AWS_ACCESS_KEY_ID,
    awsSecret: process.env.KINDLIZED_AWS_SECRET_KEY_ID,
    assocId: process.env.KINDLIZED_AWS_SSSOCIATES_ID,
  };
};
