const { signedCookie } = require('cookie-parser');
var express = require('express');
const db = require('../db.js')
const key = "yeonsu";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', (req, res, next) => {
  console.log("로그인 함수가 실행됩니다.");
  const email = req.body["email"];
  const password = req.body["password"];
  let token = "";

  db.query(`SELECT * FROM USER WHERE email="${email}" AND password="${password}"`, (err, rows, fields) => {
    if(err) throw err;
    if(rows.length > 0){
      console.log("로그인 성공");
      token = jwt.sign(
        {
          type: "JWT",
          nickname: email,
        },
        key,{
          expiresIn: "30m",
          issuer: "토큰발급자",
        }
      );
      return res.status(200).json({
        code: 200,
        message: "token is created",
        token: token,
      });
    }
    else return res.send('Try Again!');
  });
})

router.post('/signup', (req, res, next) => {
  console.log("회원가입을 진행합니다.");
  const new_user = req.body;
  db.query(`SELECT * FROM USER WHERE email="${new_user.email}"`,(err2, rows2, fields2) => {
    if (err2) {
      console.log("아이디 중복 에러");
      throw err2;
    }
    console.log("중복유저 확인 중...");
    if(rows2.length > 0) return res.status(404).json({
      code: 404,
      message: "Already exist user",
    });
    else{
      db.query(`INSERT INTO USER 
                ( name, phone, email, password ) 
                VALUE ("${new_user.nickname}", "${new_user.phonenum}", "${new_user.email}", "${new_user.password1}");`
                );
      res.send("회원가입 성공");
    }
  });
});

module.exports = router;
