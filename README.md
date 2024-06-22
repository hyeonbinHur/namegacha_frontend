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

에러 나면 에러 모달 + 화면 refresh하는 함수 모달 안에 넣기

흠... 에러 나면 에러페이지로 옮겨 말어?
옵션 1 에러 페이지로 옮긴다
옵션 2 모달을 띄운다
옵션 3 토스트를 띄운다

일단 옵션 2로 해서 에러 나면 모달 띄우고 모달안에 page refresh 함수 넣자

모달을 띄우는 방법

forwardRef
createPortal
useImperativeHandle
useRef
