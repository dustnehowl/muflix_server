var express = require('express');
var router = express.Router();


const dummy_users = [
  {
    "id": 1,
    "user_id" : "dustnrkfnfn@naver.com",
    "이름": "김 연수",
    "전화번호": "010 4665 7921",
    "password": "y8237922"
  },
  {
    "id": 2,
    "user_id" : "dustnrkfnfn@hanmail.net",
    "이름": "님 연수",
    "전화번호": "010 4665 7922",
    "password": "y8237922"
  },
  {
    "id": 3,
    "user_id" : "dustnrkfnfn@hanmail.net",
    "이름": "딤 연수",
    "전화번호": "010 4665 7923",
    "password": "y8237922"
  },
  {
    "id": 4,
    "user_id" : "dustnrkfnfn@hanmail.net",
    "이름": "림 연수",
    "전화번호": "010 4665 7924",
    "password": "y8237922"
  },
]
var id = 5;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req, res, next) => {
  var tmp_obj = req.body;
  tmp_obj["id"] = id++;
  dummy_users.push(tmp_obj);
  console.log(dummy_users);
  res.send('Sign up!');
});

module.exports = router;
