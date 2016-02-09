import request from 'supertest';
import Promise from 'bluebird';
import session from 'supertest-session';
import app from 'app.js';
import { defaultAccount } from 'test/helper/user';

function getReq(endpoint = '/', queries = {}) {
  return new Promise((resolve)=> {
    request(app)
      .get(endpoint)
      .query(queries)
      .end((err, ret)=> {
        resolve({err, ret});
      });
  });
}

function postReq(endpoint = '/', payload = {}) {
  return new Promise((resolve)=> {
    request(app)
      .post(endpoint)
      .send(payload)
      .end((err, ret)=> {
        resolve({err, ret});
      });
  });
}

function putReq() {

}

function deleteReq() {

}

function loginReq() {
  const appSession = session(app);
  const loginURI = '/account/login';
  return new Promise((resolve)=> {
    appSession
    .post(loginURI)
    .send({
      mail: `0-${defaultAccount.mail}`,
      password: `0-${defaultAccount.password}`,
    })
    .end(()=> {
      resolve(appSession);
    });
  });
}

export {
  getReq,
  postReq,
  putReq,
  deleteReq,
  loginReq,
};
