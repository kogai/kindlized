"use strict"

const User = require('common/User')
const UserCollections = require('models/User')
const log = require('common/log')

module.exports = {
  get: function(req, res){
    if(!req.session.passport.user){
      return res.status(500).send()
    }
    let conditions = {
      _id: req.session.passport.user
    }
    let props = req.query.props
    UserCollections.findOne(conditions, function(err, user){
      if(err){
        return log.info(err)
      }
      let ret = {}
      ret[props] = user[props]
      res.send(ret)
    })
  },

  put: function(req, res){
    if(!req.session.passport.user){
      return res.status(500).send()
    }
    let user = User(req.session.passport.user)
    let property = req.body.property
    let data = req.body.data

    user.modifiyProfile(property, data, function(err, savedUser){
      if(err){
        return res.status(500).send('何か間違いが起こっています。')
      }
      res.status(200).send(property + 'の編集に成功しました。')
    })
  }
}
