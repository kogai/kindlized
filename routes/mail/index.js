import request from 'superagent';
import log from 'common/log';
import makeCredential from 'common/makeCredential';
const slackPostAPI = makeCredential('slack');

export default function(req, res) {
  log.info(req);
  const mandrillEvents = req.body.mandrill_events;
  let mandrillBody;
  let mandrillHtml;

  try {
    mandrillBody = JSON.parse(mandrillEvents);
  } catch (err) {
    log.info(err);
    return res.send('no');
  } finally {
    mandrillHtml = mandrillBody[0].msg.html;
  }

  request
  .post(slackPostAPI)
  .send({
    text: mandrillHtml,
  })
  .end((err, ret)=> {
    if (err) {
      log.info(err);
      return res.status(500).send(err);
    }
    res.status(200).send(ret.text);
  });
}
