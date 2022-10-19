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

router.get("/logout", function(req, res, next){
  req.session.destroy();  // 내부 sessions 폴터 캐쉬 삭제
  res.clearCookie('sid')
  res.send('logout')
})

router.get('/check', (req, res, next) => {
  console.log(req.session.isLogined);
  if(req.session.isLogined){
    return res.json({message: 'user 있다'});
  }else{
    return res.json({message: 'user 없음'});
  }
});

router.post('/signin', (req, res, next) => {
  console.log('로그인 함수가 실행됩니다.');
  console.log(req.body["email"]);
  console.log(req.body["password"]);
  
  var user_pk = NaN;
  for(user of dummy_users){
    if(user["user_id"] === req.body["email"] && user["password"] === req.body["password"]){
      user_pk = user["id"];
      break;
    }
  }
  console.log(user_pk)
  if(isNaN(user_pk)){
    res.send('Try Again!')
  }
  else{
    req.session.userId = req.body["email"];
    req.session.isLogined = true;
    res.cookie('name', 'yeonsuß', { domain: 'localhost:3000', path: '/admin', secure: true });
    res.send('Login!')
  }
  //res.send('postfail');
})

module.exports = router;
