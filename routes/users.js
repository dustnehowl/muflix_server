var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const db = require('../db.js');

const key = "yeonsu";
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllUser', function(req, res, next) {
  console.log("모든 유저를 출력합니다.");
  db.query(`SELECT * FROM USER`, (err, rows, fields) => {
    if(err) throw err;
    res.send(rows);
  })
});

router.get('/profile', (req, res, next) => {
  console.log("프로필을 확인합니다.");
  try{
    let decoded = jwt.verify(req.headers.authorization, key);
    const user_id = decoded["nickname"];
    db.query(`SELECT * FROM USER WHERE email="${user_id}"`, (err, rows, fields) => {
      if(err) console.log(err);
      res.send([
        {
          "user_id" : rows[0].email,
          "이름" : rows[0].name,
          "전화번호": rows[0].phone,
        },
        {
          "playlist" : "곧줄게!!!",
        }
      ]);
    });
  }
  catch{
    res.send("NO USER");
  }
});

router.post('/signup', (req, res, next) => {
  console.log("회원가입을 진행합니다.");
  const new_user = req.body;
  console.log(req.body);
  db.query(`SELECT * FROM USER WHERE email="${new_user.user_id}"`,(err2, rows2, fields2) => {
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
                VALUE ("${new_user.이름}", "${new_user.전화번호}", "${new_user.user_id}", "${new_user.password}");`
                );
      res.send("회원가입 성공");
    }
  });
});

router.get('/delUser', (req, res, next) => {
  console.log("회원탈퇴를 진행합니다.");
  try{
    //let decoded = jwt.verify(req.headers.authorization, key);
    //const del_user = decoded["nickname"];
    const del_user = "test2@gmail.com";
    db.query(`DELETE FROM USER WHERE email="${del_user}"`, (err, rows, fields) => {
      if(err) console.log(err);
      res.send("회원탈퇴 완료");
    });
  }
  catch{
    res.send("NO USER");
  }
})

router.post('/signin', (req, res, next) => {
  console.log("로그인 함수가 실행됩니다.");
  const user_id = req.body["email"];
  const password = req.body["password"];
  let token = "";

  db.query(`SELECT * FROM USER WHERE email="${user_id}" AND password="${password}"`, (err, rows, fields) => {
    if(err) throw err;
    if(rows.length > 0){
      console.log("로그인 성공");
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
    else return res.send('Try Again!');
  });
})

router.get("/logout", function(req, res, next){
  return res.status(200).json({
    code: 200,
    message: "Logout!",
  });
})


module.exports = router;
