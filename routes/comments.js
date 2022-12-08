var express = require('express');
var router = express.Router();
const db = require('../db.js');
var jwt = require('jsonwebtoken');

const key = "yeonsu";

router.post('/newComment/:id', (req, res, next) => {
    console.log("댓글을 작성합니다.");
    try {
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = req.body.anomymous ? "anomymous" : decoded["nickname"];
        const new_comment = req.body.comment;
        db.query(`INSERT INTO comment 
                ( writer, write_time, comments, upvote, music_id )
                VALUE ("${user_id}", CURDATE(), "${new_comment}", 0, "${req.params.id}");`);
        
        res.send("댓글 추가 완료.");
    }
    catch (e) {
        console.log("error");
        res.send(e);
    }
});

router.get('/getComment/:id', (req, res, next) => {
    console.log("댓글을 조회합니다.");
    try {
        db.query(`SELECT * FROM comment WHERE music_id="${req.params.id}";`,(err, rows, fields) => {
            res.send(rows);
        });
    }
    catch (e) {
        console.log("error");
        res.send(e);
    }
});

router.delete('/delComment/:id', (req, res, next) => {
    console.log("댓글을 삭제합니다.");
    try {
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = decoded["nickname"];

        db.query(`DELETE FROM comment WHERE writer="${user_id}" AND id="${req.params.id}";`);
        res.send("댓글 삭제 완료.");
    }
    catch (e) {
        console.log("error");
        res.send(e);
    }
});

// 댓글 수정 기능 필요한가 논의....
// router.put('/updateComment/:id', (req, res, next) => {
//     console.log("댓글에 수정합니다.");
//     try {
//         db.query(`UPDATE comment set upvote=comment.upvote + 1 WHERE id="${req.params.id}";`);
//         res.send("공감 완료.");
//     }
//     catch (e) {
//         console.log("error");
//         res.send(e);
//     }
// });

router.put('/upvote/:id', (req, res, next) => {
    console.log("댓글에 공감합니다.");
    try {
        db.query(`UPDATE comment set upvote=comment.upvote + 1 WHERE id="${req.params.id}";`);
        res.send("공감 완료.");
    }
    catch (e) {
        console.log("error");
        res.send(e);
    }
});

module.exports = router;
