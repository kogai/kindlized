import nock from 'nock';
import assert from 'power-assert';
import request from 'supertest';
import app from 'app.js';

const SLACK_POST = process.env.KINDLIZED_SLACK;

describe('/routes/mail', ()=> {
  let response;
  const slackResponse = [
    { msg: { html: 'メールの本文' } },
  ];
  before((done)=> {
    nock(SLACK_POST)
      .post('')
      .reply(200, 'Slack relay is completed.');

    request(app)
      .post('/mail')
      .send({
        mandrill_events: JSON.stringify(slackResponse),
      })
      .end((err, ret)=> {
        if (err) {
          response = err;
        }
        response = ret;
        done();
      });
  });

  it('MandrillからのメールPOSTを中継できる', ()=> {
    assert(response.status === 200);
    assert(response.header['content-type'] === 'text/html; charset=utf-8');
    assert(response.text === 'Slack relay is completed.');
  });

  it('JSON文字列以外のペイロードは受け付けない', (done)=> {
    const notJSONString = `<html>メールの本文</html><script>alert('inject!');</script>`;
    request(app)
      .post('/mail')
      .send({
        mandrill_events: notJSONString,
      })
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 500);
        assert(ret.serverError === true);
        done();
      });
  });

  it('Slackサーバーに何かあったらメールを中継できない', (done)=> {
    nock(SLACK_POST)
      .post('')
      .reply(500, 'Slack relay is stopping.');

    request(app)
      .post('/mail')
      .send({
        mandrill_events: JSON.stringify(slackResponse),
      })
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 500);
        assert(ret.serverError === true);
        done();
      });
  });
});
