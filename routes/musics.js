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

router.delete('/delMusic/:id', (req, res, next)=>{
    console.log("음악을 삭제합니다.");
    var musicid = req.params.id;
    db.query(`DELETE FROM MUSIC WHERE id=${musicid}`,(err, rows, fields) => {
        if(err) res.send(err);
        res.send("음악삭제 완료");
    })
});

router.delete('/delPlaylist/:id', (req, res, next) =>{
    let decoded = jwt.verify(req.headers.authorization, key);
    const user_id = decoded["nickname"];
    console.log("플레이리스트를 삭제합니다.");
    try{
        var playlistid = req.params.id;
        console.log(playlistid)
        db.query(`SELECT owner FROM PLAYLIST WHERE id="${playlistid}";`,(err, rows, fields) => {
            console.log(rows);
            res.send("hello");
        });
        db.query(`DELETE FROM PLAYLIST WHERE id="${playlistid}" AND owner="${user_id}";`, (err, rows, fields) => {
            if(err) return res.status(404).json({
                code: 412,
                message: '플레이리스트 소유자가 아닙니다.',
            });
            console.log(rows);
            //db.query(`DELETE FROM music_playlist WHERE playlist_id="${playlistid}";`);
            res.send("플레이리스트 삭제 완료");
        });
    }
    catch (e){
        res.send(e);
    }
})

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

router.get('/getPlaylist/:id', (req, res, next) => {
    console.log("특정 플레이리스트를 조회합니다.");
    var playlistid = req.params.id;
    db.query(`SELECT * FROM PLAYLIST WHERE id="${playlistid}"`, (err, rows, fields) => {
        var playlist = rows[0];
        db.query(`SELECT music_id FROM music_playlist WHERE playlist_id="${playlistid}"`, (err2, rows2, fields2)=>{
            res.send({
                "playlist_info" : playlist,
                "musics" : rows2,
            });
        });
    });
});

router.post('/addPlaylist', (req, res, next) => {
    console.log("새로운 플레이리스트를 추가합니다.");
    try {
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = decoded["nickname"];
        const new_playlist = req.body;
        console.log(user_id, new_playlist.name, new_playlist.information);
        db.query(`INSERT INTO PLAYLIST
                    ( owner, name, information )
                    VALUE ("${user_id}", "${new_playlist.name}", "${new_playlist.information}");`);
        db.query(`SELECT id FROM PLAYLIST WHERE owner="${user_id}" AND name="${new_playlist.name}";`, (err, rows, fields) => {
            if(err) throw err;
            for(let tmp_music of new_playlist.musics){
                db.query(`INSERT INTO music_playlist
                        ( music_id, playlist_id )
                        VALUE ("${tmp_music}","${rows[0].id}");`);
            }
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

router.put('/updatePlaylist/:id', (req, res, next) => {
    console.log("플레이리스트를 수정합니다.");
    try{
        let decoded = jwt.verify(req.headers.authorization, key);
        const user_id = decoded["nickname"];
        let owner = db.query(`SELECT owner FROM PLAYLIST WHERE id="${req.params.id}";`);
        console.log(owner);
        const tmp_playlist = req.body;
        db.query(`UPDATE PLAYLIST SET name="${tmp_playlist.name}", information="${tmp_playlist.information}" WHERE id=${req.params.id};`);
        db.query(`DELETE FROM music_playlist WHERE playlist_id="${req.params.id}";`);
        for(let tmp_music of tmp_playlist.musics){
            db.query(`INSERT INTO music_playlist
                    ( music_id, playlist_id )
                    VALUE ("${tmp_music}","${req.params.id}");`);
        }
        res.send({
            "name": tmp_playlist.name,
            "message": "플레이리스트 수정완료"
        })
    }
    catch (e){
        res.send(e);
    }
});

module.exports = router;
