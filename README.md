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
npm install -D sass

# react query devtool

npm i @tanstack/react-query-devtools

# taost

npm install react-toastify

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

일단 page 재사용하는 방법부터 고민 해봐야할듯?
남은거
로딩
리덕스 불변성
배열 복사할때
let myArray = reduxArray
myArray= action.payload.newArray
reduxArray = myArray
(x)
이렇게 하면 문제가 생기는게, my배열 = 리덕스 배열 하면, 참조 복사가 되서, my배열 = action.payload.newArray했을때 리덕스 배열도 변한다. 이러면 불변성 어쩌고가 문제가 생겨서
복사할때
let changeArray = [...reduxArray] 로복사해줘야한다
myArray= action.payload.newArray
reduxArray = myArray
(o)

/// 하나씩만 edit 가능

오늘

css-----

에러 페이지 css

에러 모달 css

인풋 css

css 피드백 고치기

context menu css

사이드바 add page

사이드바 로그인시 프로젝트때 css

사이드바 new var or func 인풋 체크

js----------

useQuery에러 확인 -- ㄱㅈ? --> 일단보류

ai----------

ai instruction 바꾸기

마지막 -->

퍼포먼스
