var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const db = require('../db.js');

const key = "yeonsu";
const tokenChecker = function (req, res, next) {
  console.log("토큰을 확인합니다.");
  try {
    let decoded = jwt.verify(req.headers.authorization, key);
    //res.send("토큰 확인 완료");
    next();
  }
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.'
   });
  }
};

router.use(tokenChecker);
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
    console.log(decoded);
    const user_id = decoded["nickname"];
    db.query(`SELECT * FROM USER WHERE email="${user_id}"`, (err, rows, fields) => {
      if(err){
        return res.status(404).json({
          code: 404,
          message: '유저 조회 왜 안될까요',
        });
      }
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

router.get('/delUser', (req, res, next) => {
  console.log("회원탈퇴를 진행합니다.");
  try{
    let decoded = jwt.verify(req.headers.authorization, key);
    const del_user = decoded["nickname"];
    //const del_user = "test2@gmail.com";
    db.query(`DELETE FROM USER WHERE email="${del_user}"`, (err, rows, fields) => {
      if(err) console.log(err);
      res.send("회원탈퇴 완료");
    });
  }
  catch{
    res.send("NO USER");
  }
})

router.get("/logout", function(req, res, next){
  return res.status(200).json({
    code: 200,
    message: "Logout!",
  });
})


module.exports = router;
