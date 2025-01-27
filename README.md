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

- 예측 가능한 오류: 인증 오류, 잘못된 요청, 유효성 검사 오류와 같은 HTTP 요청 관련 오류입니다. 이 오류들은 Axios와 React Query를 사용하여 오류 모달로 표시됩니다.

- Unpredictable Errors: These include rendering errors and network failures. These errors are handled using the React Error Boundary library, displaying modals with error codes and messages.

- 예측 불가능한 오류: 예측 불가능한 에러에는 렌더링 오류나 네트워크 장애가 포함됩니다. 이러한 오류는 React Error Boundary 라이브러리를 사용하여 처리되며, 오류 코드와 메시지를 포함한 모달을 통해 사용자에게 표시됩니다.

## Feature

### Chatting 
![chat_1](https://github.com/user-attachments/assets/a460be6a-e74f-42fb-9c46-9ceab543a5e0)
![chat_4](https://github.com/user-attachments/assets/1759705e-82a7-4c06-a842-f4fabb2a6c57)

### Sidebar
![sidebar_2](https://github.com/user-attachments/assets/5957d2af-edf2-442a-bf35-eca442b6b217)

### Detail Page
![detail_2](https://github.com/user-attachments/assets/5bf5ea8b-824e-4676-9384-b63d56f977c1)


## 회고

해당 프로젝트는 개발자의 기본 역량 중 하나인 유지 보수성에 대해 깊이 고민할 수 있었던 프로젝트였습니다. 유지 보수가 가능한 코드, 가독성이 좋고 플로우가 매끄러우며, 남들이 이해하기 쉬운 코드를 작성하기 위해 많은 노력을 기울였습니다. 과거에는 기능 하나하나를 구현하기 위한 '코더'에 가까웠다면, 이번 프로젝트에서는 하나의 프로덕트를 개발하기 위한 '개발자'로서 기능 구현뿐만 아니라 유지 보수 측면에서도 최선을 다하며, 일관성 있는 코드를 작성할 수 있었습니다.

개발자가 되기 위해서는 기본 역량뿐만 아니라 트렌드에 대한 감각도 중요하다고 생각합니다. 빠르게 변하는 시장에서 최신 트렌드에 집중하고 신기술을 도입할 줄 아는 것이 필요합니다. 이번 프로젝트에서는 OpenAI의 Assistant API를 도입하는 과정에서 자료가 한정적임에도 불구하고, KaKaoTalk 오픈채팅, 학교 교수님, OpenAI Company 등 다양한 경로를 통해 문제를 해결했습니다. 이를 통해 새로운 기술을 받아들이고 구현할 수 있는 능력을 키우며, 한층 성장할 수 있었습니다.

또한, 능동적인 개발자로서 스스로 문제를 제시하고 해결해 나가는 경험을 할 수 있었습니다. 학교 과제나 대회처럼 주어진 주제에 맞춰 방향성을 잡는 것이 아니라, "내가 필요로 하는 기술은 무엇인가?"를 고민하며 프로젝트를 시작했습니다. 프로젝트의 필요성에서 출발한 것이 아니라, 기술의 필요성에서 문제를 정의하고 해결하는 과정을 통해 수동적인 개발자가 아닌 길을 개척하는 개발자로서 하나의 프로덕트를 완성할 수 있었습니다.

프로젝트 과정에서 직면했던 가장 큰 문제는 비용이었습니다. AI 모델을 사용하기 위해 OpenAI에 지불해야 하는 비용과 AWS Lambda 함수를 통해 외부 서비스를 호출하기 위한 AWS NAT Gateway 비용 등, 많은 것을 배웠지만 경제적 부담도 상당했습니다. 구독 시스템을 통해 월별 요금제가 발생했으며, 사용량에 비례하지 않더라도 기본적으로 지불해야 하는 비용 문제로 인해 현재는 서비스를 배포 중단 상태로 두고 있습니다.

이와 같이, 해당 프로젝트는 개발자로서의 유지 보수성에 대한 고민, 신기술을 도입하는 능력, 능동적으로 문제를 제시하고 해결하는 자세를 포함해 전문가가 되기 위한 다양한 노력들을 녹여낸 경험입니다. 또한, 비용이라는 실질적인 문제를 직접 체감하며 배운 점이 많아, 저의 대표 프로젝트로 자리 잡았습니다.

















