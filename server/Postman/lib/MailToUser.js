import Q from 'q';
import log from 'common/log';
import inspectNotifiedBooks from 'Postman/lib/inspectNotifiedBooks';
import inspectKindlizedBooks from 'Postman/lib/inspectKindlizedBooks';
import insertMailTemplate from 'Postman/lib/insertMailTemplate';
import sendKindlizedNotification from 'Postman/lib/sendKindlizedNotification';
import modifyNotifiedStatus from 'Postman/lib/modifyNotifiedStatus';

const MailToUser = {};

MailToUser.send = function send(user) {
  const deffered = Q.defer();
  if (process.env.NODE_ENV === 'production' || user.mail === 'kogai0121@gmail.com') {
    inspectNotifiedBooks(user)
    .then(inspectKindlizedBooks)
    .then(insertMailTemplate)
    .then(sendKindlizedNotification)
    .then(modifyNotifiedStatus)
    .done((modifiedUser)=> {
      log.info(`${modifiedUser.mail}の処理が完了`);
      deffered.resolve();
    });
  } else {
    log.info(`${user.mail}の処理をスキップ`);
    deffered.resolve();
  }
  return deffered.promise;
};

MailToUser.inspectNotifiedBooks = inspectNotifiedBooks;
MailToUser.inspectKindlizedBooks = inspectKindlizedBooks;
MailToUser.insertMailTemplate = insertMailTemplate;
MailToUser.sendKindlizedNotification = sendKindlizedNotification;
MailToUser.modifyNotifiedStatus = modifyNotifiedStatus;

module.exports = MailToUser;
