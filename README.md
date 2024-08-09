# Name Gacha Front-End
<p>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/React Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=SASS&logoColor=white">
<img src="https://img.shields.io/badge/Toastify-000000?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Error Boundary-000000?style=for-the-badge&logoColor=white">
</p>




## Project Overview

This project is an AI-powered chatting application built with AWS and React. The main feature is to provide identifier names and explanations for developers. When a developer gives a simple explanation to the AI, it returns 9 sample names with explanations. The developer can choose one of these names and save the name and explanation to their database. The database and REST API are built [here](https://github.com/hyeonbinHur/Name_Gacha_aws_lambda), and the front-end code is contained in this repository.

### Project Design

For more details, see the [Project Design Document](https://uncle-hyeonb.tistory.com/27).

## Libraries Used

-   **React Vite**
-   **React Router**
-   **React Query**
-   **React Icons**
-   **React Redux**
-   **Axios**
-   **Sass**
-   **React Toastify**
-   **React Error Boundary**
-   **React Query Devtools**

## Setup

Run the following command to install dependencies:

```bash
npm install
```

## Key Libraries

### Axios

The REST APIs used in the front-end are encapsulated using Axios. This ensures consistent, predictable, and reliable HTTP requests. Predictable errors are handled by separating the error codes and messages.

### React Query

All HTTP requests created with Axios are managed through React Query, allowing consistent handling of server states such as loading, success, and error. By actively utilizing caching with React Query, the frequency of HTTP requests is drastically reduced, significantly improving the application's performance.

### Redux

Six global state slices are used to manage most global states such as the current chatting thread, modals, context menus, and selected pages through Redux.

## Error Handling

Two main types of errors are handled:

-   Predictable Errors: These include HTTP request-related errors such as authentication errors, bad requests, and validation errors. These errors are managed using Axios and React Query by displaying error modals.

-   Unpredictable Errors: These include rendering errors and network failures. These errors are handled using the React Error Boundary library, displaying modals with error codes and messages.

Additionally, if a user navigates to an incorrect URL, an error page is displayed to handle the issue.
