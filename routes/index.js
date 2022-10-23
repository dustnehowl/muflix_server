const { signedCookie } = require('cookie-parser');
var express = require('express');
const db = require('../db.js')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next){
  console.log(req.body);
})

router.get('/test', (req, res, next) => {
  db.getAllMembers((rows) => {
    console.log(rows);
    res.send(rows);
  });
});

module.exports = router;
