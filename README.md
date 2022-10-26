# muflix_server
    18101201 김연수
    muflix 서버 개발

## API 정리

1. GET

* users/getAllUser : 모든 유저를 반환합니다.
* users/profile : 현재 접속해 있는 유저의 정보를 제공한다.
* users/logout : 로그아웃 API
* users/delUser : 현재 접속해 있는 유저 탈퇴

* musics/getAllMusics : 모든 음악정보를 프론트로 보낸다.
* musics/getMusic : 음악정보를 조회한다.
* musics/getAllPlaylist : 모든 플레이리스트를 프론트로 보낸다.


2. POST

* users/signin : 로그인 API
```
req.body {
   "email": "?",
   "password" : "?",
}
```

* users/signup : 회원가입 API
```
req.body {
    "user_id" : "?",
    "이름" : "?",
    "전화번호" : "?",
    "password" : "?",
}
```

* musics/addMusic : 음악추가 API
```
req.body {
    "name": "?",
    "singer": "?",
    "album_cover": "?",
}
```

* musics/addPlaylist : 플레이리스트추가 API
```
req.body {
    "name" : "?",
    "information" : "?",
    "musics" : 미정,
}
// musics 와 연동이 필요 아직 실사용은 불가능하다.!!
```