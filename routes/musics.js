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
    
});

module.exports = router;
