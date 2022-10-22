var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const key = "yeonsu";
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
    "user_id" : "dustnrkfnfn@gmail.com",
    "이름": "딤 연수",
    "전화번호": "010 4665 7923",
    "password": "y8237922"
  },
  {
    "id": 4,
    "user_id" : "dustnrkfnfn@yahoo.co.kr",
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

router.get('/profile', (req, res, next) => {
  console.log("프로필을 확인합니다.");
  let decoded;
  //console.log(req.headers);
  try{
    decoded = jwt.verify(req.headers.authorization, key);
    //console.log(decoded);
    const user_id = decoded["nickname"];
    const user = dummy_users.filter(user => user.user_id === user_id)[0];
    console.log(user);

    res.send([
      {
        "user_id" : user["user_id"],
        "이름" : user["이름"],
        "전화번호" : user["전화번호"],
      },
      {
        "playlist" : "곧 줄게!!!",
      }
    ]);
  }
  catch{
    res.send("No User");
  }
})

router.get("/logout", function(req, res, next){
  return res.status(200).json({
    code: 200,
    message: "Logout!",
  });
})

router.get("/double_check", function(req, res, next) {
  console.log("중복확인을 실행합니다.");
  var user_id = req.body["email"];
  const user = dummy_users.filter(user => user.user_id === user_id);
  if(user.length > 0) {
    console.log("사용 불가능한 아이디입니다.");
    res.send("Try Again");
  }
  else{
    console.log("가능한 ID입니다.")
    res.send("Available");
  }
});

router.post('/signin', (req, res, next) => {
  console.log('로그인 함수가 실행됩니다.');

  console.log(req.body);
  var user_id = req.body["email"];
  var password = req.body["password"];
  let token = "";

  const user = dummy_users.filter(user => user.user_id === user_id && user.password === password);
  if(user.length > 0) {
    console.log("로그인 성공")
    token = jwt.sign(
      {
        type: "JWT",
        nickname: user_id,
      },
      key,{
        expiresIn: "60m",
        issuer: "토큰발급자",
      }
    );
    return res.status(200).json({
      code: 200,
      message: "token is created",
      token: token,
    });
  }
  else{
    res.send('Try Again!')
  }
})

module.exports = router;
