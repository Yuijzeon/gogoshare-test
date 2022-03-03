var express = require('express');
var router = express.Router();

var db = require('better-sqlite3')('./team2.db');
var sql = require('./sqltasks');

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  var user = db.prepare(`
    SELECT * FROM users
    WHERE (account = @account) AND (password = @password)
  ;`).get(req.body);
  req.session.user = user;
  res.redirect('/user');
});

router.post('/', function (req, res, next) {
  res.json(sql.insert('users', req.body));
});

router.get('/', function (req, res, next) {
  res.json(sql.selectMany('users'));
});

router.get('/:id', function (req, res, next) {
  res.json(sql.select('users', req.params));
});

module.exports = router;
