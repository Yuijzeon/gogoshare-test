var express = require('express');
var router = express.Router();

var db = require('better-sqlite3')('./team2.db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.json(req.session.user);
  // res.json({
  //   session_id: req.session.id,
  //   AAA: req.session.user,
  //   session_user: req.session.user,
  //   sqlite_version: db.prepare('SELECT sqlite_version();').get()['sqlite_version()'],
  //   sqlite_tables: db.prepare(`SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';`).all(),
  // });
});

router.get('/initdb', function (req, res, next) {
  var stmt = db.prepare(`CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    account TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    fphoto INTEGER,
    point INTEGER DEFAULT 0,
    logindays INTEGER DEFAULT 0,
    birthdate TEXT NOT NULL,
    joindate TEXT DEFAULT (datetime())
  );`);
  var info = stmt.run(req.body);
  res.json({
    info_changes: info.changes
  });
});

module.exports = router;
