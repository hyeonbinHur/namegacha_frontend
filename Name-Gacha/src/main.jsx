import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/authContext.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
