var express = require('express');
var router = express.Router();
const db = require('../db.js');
var jwt = require('jsonwebtoken');

const key = "yeonsu";

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
    db.query(`INSERT INTO MUSIC 
                ( name, singer, album_cover ) 
                VALUE ("${new_music.name}", "${new_music.Singer}", "${new_music.cover}");`
                );
    res.send({
        "name" : new_music.name,
        "message" : "음악추가 완료"
    });
});

router.get('/getMusic/:id', (req, res, next) => {
    var musicid = req.params.id;
    console.log("음악정보를 조회합니다.");
    db.query(`SELECT * FROM MUSIC WHERE id=${musicid}`,(err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    })
});

router.get('/getAllPlaylist', (req, res, next) => {
    console.log("플레이리스트를 조회합니다.");
    db.query(`SELECT * FROM PLAYLIST`, (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    });
});

router.post('/addPlaylist', (req, res, next) => {
    console.log("새로운 플레이리스트를 추가합니다.");
    try {
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = decoded["nickname"];
        db.query(`SELECT id FROM USER WHERE email="${user_id}"`, (err, rows, fields) => {
            if(err) console.log(err);
            const new_playlist = req.body;
            const user = rows[0];
            console.log(user.id, new_playlist.name, new_playlist.information);
            db.query(`INSERT INTO PLAYLIST
                     ( owner, name, information )
                     VALUE ("${user.id}", "${new_playlist.name}", "${new_playlist.information}");`);
            db.query(`SELECT id FROM PLAYLIST WHERE owner="${user_id}" AND name="${new_playlist.name}";`, (err, rows, fields) => {
                if(err) throw err;
                res.send(rows[0]);
            });
            // db.query(`INSERT INTO music_playlist
            //          ( music_id, playlist_id )
            //          VALUE ("${}","${}");`);
            res.send({
                "name" : new_playlist.name,
                "message" : "플레이리스트 추가 완료",
            });
        });
    }
    catch (e) {
        console.log("error");
        res.send(e);
    }
});

module.exports = router;
