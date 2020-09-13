const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User


// 設定認證策略， localStrategy 代表在本地端處理跟登入相關的設定
// passport.use(new LocalStrategy(option「註：客製化選項」, function「註：登入認證程序」))
passport.use(new LocalStrategy(
  // 設定使用者欄位名稱
  {
    usernameField: 'email',
    passwordField: 'password',
    // passReq 是指將 req 傳至下方使用
    passReqToCallback: true
  },
  // 使用者認證
  (req, username, password, cb) => {
    User.findOne({ where: { email: username } }).then(user => {
      if (!user)
        return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤'))
      if (!bcrypt.compareSync(password, user.password))
        return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
      return cb(null, user)
    })
  }
))

// 正序列化 => 只存 user id 不存整個 user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
// 反序列化 => 透過user id，把整個 user 的物件取出
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport