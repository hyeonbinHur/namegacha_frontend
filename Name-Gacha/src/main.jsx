import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { AuthContextProvider } from './context/authContext.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/ErrorPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <ErrorBoundary FallbackComponent={ErrorPage}>
                    <App />
                </ErrorBoundary>
            </AuthContextProvider>
        </Provider>
    </React.StrictMode>
);
