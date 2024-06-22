# React Vite

> npm create vite@latest

# aixos

> npm i axios

# react router

> npm install react-router-dom@^6.23.1

# react query

> npm install react-query@^3.39.3

# react icon

> npm install react-icons@^5.2.1

# package.json

`"axios": "^1.7.2",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-icons": "^5.2.1",
"react-query": "^3.39.3",
"react-router-dom": "^6.23.1"`

> npm install

# aws name

uncle.hyeonb

# redux

npm install @reduxjs/toolkit react-redux

# blog link

design : https://uncle-hyeonb.tistory.com/27

# sass

npm install node-sass

# react query devtool

npm i @tanstack/react-query-devtools

### 06 / 15

-   [x] 프로젝트 생성
-   [x] 페이지 생성
-   [x] 함수 및 변수 생성

6/19

    think about the page structure
    formatting ai answer
    -> 하면 모든 구현 끝

프론트 엔드 : {
아까 만들었던 폼 같은 코드가 3~4 번 반복되는거같은데 reuse할 방법 찾기
}

일단 옵션 2로 해서 에러 나면 모달 띄우고 모달안에 page refresh 함수 넣자 -> 이렇게 하지말고, 모달로 경고하고, 페이지에 경고문 넣어주자.

옵션 1. 모달로 경고하고, 페이지 화면 전부 에러처리할지
옵션 2. 모달로 경고하고, 페이지 화면에 작게 띄울지

## error boundary

> npm install react-error-boundary

6월 23일 기본 stale타임이랑 cache타임 생성 완료

page안에 있는 page,variable, functions 에서 생성, 삭제, 업데이트시

get해당 페이지 query랑 getProjects유저 아이디 재실행 시키기

일단 page 재사용하는 방법부터 고민 해봐야할듯?

남은거

페이지 재사용
ai 대답 formatting
ai 대답 add project에 넣기
로딩
페이지 스트럭쳐
