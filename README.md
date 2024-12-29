# Name Gacha Front-End

<div align="center">

아랫부분에 회고가 있습니다
  
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/React Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=SASS&logoColor=white">
<img src="https://img.shields.io/badge/Toastify-000000?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Error Boundary-000000?style=for-the-badge&logoColor=white">
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/4c42d3da-e9c5-463e-aa6a-fb6439f30767">
  
</div>

## Project Overview

This project is an AI-powered chatting application built with AWS and React. The main feature is to provide identifier names and explanations for developers. When a developer gives a simple explanation to the AI, it returns 9 sample names with explanations. The developer can choose one of these names and save the name and explanation to their database. The database and REST API are built [here](https://github.com/hyeonbinHur/Name_Gacha_aws_lambda), and the front-end code is contained in this repository.

이 프로젝트는 AWS와 React로 구축된 AI 기반 채팅 애플리케이션입니다. 주요 기능은 개발자에게 식별자 이름과 설명을 제공하는 것입니다. 개발자가 AI에게 간단한 설명을 입력하면, AI는 9개의 샘플 이름과 설명을 반환합니다. 개발자는 이 중 하나의 이름을 선택하여 이름과 설명을 데이터베이스에 저장할 수 있습니다. 데이터베이스와 REST API는 여기에서 확인할 수 있으며, 프론트엔드 코드는 이 저장소에 포함되어 있습니다.

### Project Design

For more details, see the [Project Design Document](https://uncle-hyeonb.tistory.com/27).

## Libraries Used

- **React Vite**
- **React Router**
- **React Query**
- **React Icons**
- **React Redux**
- **Axios**
- **Sass**
- **React Toastify**
- **React Error Boundary**
- **React Query Devtools**

## Setup

Run the following command to install dependencies:

```bash
npm install
```

## Key Libraries

### Axios

The REST APIs used in the front-end are encapsulated using Axios. This ensures consistent, predictable, and reliable HTTP requests. Predictable errors are handled by separating the error codes and messages.

프론트엔드에서 사용되는 REST API들은 Axios를 사용하여 캡슐화됩니다. 이를 통해 일관적이고 예측 가능하며 신뢰할 수 있는 HTTP 요청을 보장합니다. 예측 가능한 오류는 오류 코드와 메시지를 분리하여 처리합니다.

### React Query

All HTTP requests created with Axios are managed through React Query, allowing consistent handling of server states such as loading, success, and error. By actively utilizing caching with React Query, the frequency of HTTP requests is drastically reduced, significantly improving the application's performance.

Axios로 생성된 모든 HTTP 요청은 React Query를 통해 관리되어, 로딩, 성공, 오류와 같은 서버 상태를 일관되게 처리합니다. React Query의 캐싱 기능을 적극 활용하여 HTTP 요청의 빈도를 대폭 줄여 애플리케이션의 성능을 크게 향상시킵니다.

### Redux

Six global state slices are used to manage most global states such as the current chatting thread, modals, context menus, and selected pages through Redux.

현재 채팅 스레드, 모달, 컨텍스트 메뉴, 선택된 페이지 등 대부분의 글로벌 상태는 Redux를 통해 관리됩니다. Redux에서는 총 6개의 글로벌 상태 슬라이스가 사용됩니다.

## Error Handling

- Predictable Errors: These include HTTP request-related errors such as authentication errors, bad requests, and validation errors. These errors are managed using Axios and React Query by displaying error modals.
- 
- 예측 가능한 오류: 인증 오류, 잘못된 요청, 유효성 검사 오류와 같은 HTTP 요청 관련 오류입니다. 이 오류들은 Axios와 React Query를 사용하여 오류 모달로 표시됩니다.


- Unpredictable Errors: These include rendering errors and network failures. These errors are handled using the React Error Boundary library, displaying modals with error codes and messages.

## Feature

### Chatting 
![chat_1](https://github.com/user-attachments/assets/a460be6a-e74f-42fb-9c46-9ceab543a5e0)
![chat_4](https://github.com/user-attachments/assets/1759705e-82a7-4c06-a842-f4fabb2a6c57)

### Sidebar
![sidebar_2](https://github.com/user-attachments/assets/5957d2af-edf2-442a-bf35-eca442b6b217)

### Detail Page
![detail_2](https://github.com/user-attachments/assets/5bf5ea8b-824e-4676-9384-b63d56f977c1)


## 회고

이번 프로젝트를 통해 리덕스를 활용한 상태 관리에 대한 이해도가 전반적으로 크게 향상되었다. 다양한 모달, 컨텍스트 메뉴, 채팅 관리, 스레드 관리 등을 전역 상태로 관리하려는 의도가 있었으며, 웹 애플리케이션처럼 안정적이고 예측 가능한 전역 변수를 원했다. 여러 상황에서 리덕스를 효율적으로 활용하며 전역 상태를 효과적으로 다룰 수 있었다.

Authentication 측면에서는 OAuth, Redis, 그리고 민감한 정보를 다루기 위한 인증(Authentication) 기술에 대한 깊은 이해가 필요하다는 것을 절감했다. JWT를 사용하여 취약 정보를 웹페이지 및 클라이언트 측면에서 안전하게 관리하는 방법, 세션(Session)과 쿠키(Cookie)에 대한 이해는 프론트엔드 개발자라면 반드시 갖춰야 할 핵심 지식이었다. 이 과정에서 돌아가는 길도 있었지만, 최종적으로 원하는 목표에 도달하며 중요한 교훈을 얻을 수 있었다.

OpenAI 관련 기능 구현은 큰 도전이었다. 프로젝트를 시작할 당시 OpenAI의 Assistant API는 출시된 지 불과 3개월밖에 지나지 않은 베타 버전이었다. React, JavaScript, JWT처럼 널리 사용되고 정보가 풍부한 기술 스택과 달리, AWS NAT Gateway, CORS 설정, API 프로세스 등에서 많은 어려움을 겪었다. 처음에는 OpenAI에 직접 문의하는 것에 주저했지만, 문제 해결의 실마리를 찾기 위해서는 직접적인 소통이 필요했다. 결과적으로 OpenAI와 직접 연락을 주고받으며 필요한 정보를 확보했고, 이 과정에서 한층 더 성장할 수 있었다.

Error Boundary 구현에서는 아쉬움이 남는다. 다양한 에러의 종류와 처리 방식에 대해 깊이 고민했지만, 완벽한 해결에는 이르지 못했다. 예상 가능한 오류는 어느 정도 처리할 수 있었지만, 예측 불가능한 오류(Unexpected Error)에는 여전히 부족함이 있었다. 프론트엔드와 백엔드 양측의 다양한 에러 상황과 가능성을 고려하여 더욱 탄탄한 에러 핸들링이 필요하다고 느꼈다.

Modal 및 ContextMenu는 효율적이고 매끄럽게 구현되었다고 자부한다. useImperativeHandle, createPortal, useForwardRef, 그리고 Redux를 적극 활용하여 복잡한 모달 관리를 일관된 흐름으로 처리했다. 누구나 이해할 수 있는 코드, 부드러운 플로우, 예측 가능한 상태 관리를 통해 높은 만족감을 얻었다.

배포 과정은 새로운 도전이었다. AWS Lambda 함수를 이용해 서버리스 프로젝트를 완성한 뒤, GitHub Pages를 통해 프론트엔드 배포를 진행했다. 처음 진행하는 배포 과정에서 예상치 못한 수많은 에러와 직면했고, 프로젝트가 완성된 후에도 배포 오류 해결에 상당한 시간을 투자해야 했다.

AWS는 이번 프로젝트에서 핵심적인 역할을 했다. AWS Lambda, NAT Gateway, API Gateway, 그리고 RDS 총 네 가지 서비스를 이용하여 서버리스 아키텍처를 구성했다. Lambda 함수로 외부 API에 접근하기 위해 NAT Gateway가 필요하다는 사실을 초기에 인지하지 못해 헤더(Request Header) 설정에만 집중했었다. 그러나 실무 개발자들의 도움으로 NAT Gateway의 필요성을 깨닫고 문제를 성공적으로 해결할 수 있었다.

이번 프로젝트는 기술적인 역량뿐만 아니라 문제 해결 능력, 커뮤니케이션, 그리고 새로운 도전에 대한 태도를 성장시키는 값진 경험이었다.










