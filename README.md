# muflix_server
    18101201 김연수
    muflix 서버 개발

## API 정리

1. GET

* users/getAllUser : 모든 유저를 반환합니다.
* users/profile : 현재 접속해 있는 유저의 정보를 제공한다.
* users/logout : 로그아웃 API
* users/delUser : 현재 접속해 있는 유저 탈퇴


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