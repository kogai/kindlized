import localPassport from 'routes/account/login/lib/localPassport';
import passPortSerialize from 'routes/account/login/lib/passPortSerialize';

// シリアライズ関数をpassportインスタンスに登録
localPassport.serializeUser( passPortSerialize.serialize );
localPassport.deserializeUser( passPortSerialize.deSerialize );

module.exports = {
  localPassport: localPassport,
};
