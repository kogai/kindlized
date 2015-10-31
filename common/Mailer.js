const nodemailer = require('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const emailTemplates = require('email-templates');
const templatesDir = require('path').resolve(__dirname, '..', 'email-templates');
const credentialMandrill = process.env.KINDLIZED_MANDRILL;

function Mailer(opts) {
  this.UserCollections = require('models/User');
  this.BookListCollections = require('models/Book');

  this.subject = opts.subject;
  this.from = opts.from;
  this.to = opts.to;
  this.text = opts.text || '';
  this.html = opts.html || '';
}

Mailer.prototype.send = function send(done) {
  const transporter = nodemailer.createTransport(mandrillTransport({
    auth: {
      apiKey: credentialMandrill,
    },
  }));

  const mailOptions = {
    from: `kindelize.it <${this.from}>`,
    to: this.to,
    subject: this.subject,
    text: this.text,
    html: this.html,
  };

  transporter.sendMail(mailOptions, (err, info)=> {
    if (err) {
      return done(err);
    }
    done(null, info);
  });
};


/**
@param { String } from - from@kindlize.it
@param { String } to - to@user.it
@param { Object } templates - メールの文面
@example {
  html: '<a href="/">url</a>',
  text: 'url'
}
**/
Mailer.prototype.setMail = function setMail(from, to, subject, templates) {
  this.from = from;
  this.to = to;
  this.subject = subject;
  this.html = templates.html;
  this.text = templates.text;
};


/**
@param { String } type - テンプレートのタイプ
@param { Array } books - BookListコレクション
**/
Mailer.prototype.createTemplate = function createTemplate(type, books, done) {
  emailTemplates(templatesDir, (err, template)=> {
    if (err) {
      return done(err);
    }
    const templateArgv = {
      books: books.map((book)=> {
        let img;
        try {
          img = JSON.parse(book.images);
          img = img[0].ImageSet[0].MediumImage[0].URL[0];
        } catch (error) {
          img = '';
        }

        return {
          title: book.title,
          ASIN: book.ASIN,
          url: book.url,
          img: img,
        };
      }),
    };

    template(type, templateArgv, (templateError, html, text)=> {
      if (templateError) {
        return done(templateError);
      }
      done(null, {
        html: html,
        text: text,
      });
    });
  });
};

Mailer.prototype.createRegisterTemplate = function createRegisterTemplate(verifyLink, done) {
  const type = 'register';
  emailTemplates(templatesDir, (err, template)=> {
    if (err) {
      return done(err);
    }
    const templateArgv = {
      verifyLink,
    };

    template(type, templateArgv, (templateError, html, text)=> {
      if (templateError) {
        return done(templateError);
      }
      this.html = html;
      this.text = text;
      done(null);
    });
  });
};

export default function(opts = {}) {
  return new Mailer(opts);
}
