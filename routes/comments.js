var express = require('express');
var router = express.Router();
const db = require('../db.js');
var jwt = require('jsonwebtoken');

const key = "yeonsu";

router.post('/newComment/:id', (req, res, next) => {
    console.log("댓글을 작성합니다.");
    try {
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = decoded["nickname"];
        const new_comment = req.body;
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

module.exports = router;
