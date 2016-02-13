import request from 'superagent';
const slackPostAPI = process.env.KINDLIZED_SLACK;

export default function(req, res) {
  const mandrillEvents = req.body.mandrill_events;
  let mandrillBody;
  let mandrillHtml;

  try {
    mandrillBody = JSON.parse(mandrillEvents);
  } catch (err) {
    return res.status(500).send(err);
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
      return res.status(500).send(err);
    }
    res.status(200).send(ret.text);
  });
}
