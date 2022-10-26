var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.get('/getAllMusics', (req, res, next) => {
    console.log("모든 음악들을 조회중입니다.");
    db.query(`SELECT * FROM MUSIC`, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    });
});

router.post('/addMusic', (req, res, next) => {
    console.log("새로운 음악을 추가합니다.");
    const new_music = req.body;
    console.log(new_music);
    res.send("잠시만 기다려주쇼...");
    db.query(`INSERT INTO MUSIC 
                ( name, singer, album_cover ) 
                VALUE ("${new_music.name}", "${new_music.Singer}", "${new_music.cover}");`
                );
    res.send({
        "name" : new_music.name,
        "message" : "음악추가 완료"
    });
});

router.get('/getMusic', (req, res, next) => {
    console.log("음악정보를 조회합니다.");
    const tmp_music = req.body;
    // json 으로 올라나??
});

router.get('/getAllPlaylist', (req, res, next) => {
    db.query(`SELECT * FROM PLAYLIST`, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    });
});

module.exports = router;
