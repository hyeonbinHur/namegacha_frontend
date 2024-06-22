import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Test2 from './pages/Test2';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import useApiErrorHandler from './hooks/useApiErrorHandle.js';
import { useRef, useEffect } from 'react';
import ErrorModal from './components/Modal/ErrorModal.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setError } from './store/errorSlice.js';

function App() {
    const dispatch = useDispatch();

    const apiErrorHandler2 = (error) => {
        const serviceCode = error?.response?.data?.code;
        const hpptMessage = error?.response?.data?.message;
        dispatch(setError({ message: hpptMessage, code: serviceCode }));
    };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                onError: (error) => {
                    apiErrorHandler2(error);
                },
            },
            mutations: {
                onError: (error) => {
                    apiErrorHandler2(error);
                },
            },
        },
    });

    const isError = useSelector((state) => state.errorSlice.isError);

    useEffect(() => {
        if (isError) {
            console.log('setted error on app.jsx');
            errorModal.current.open();
        } else {
            console.log('clear error on app.jsx');
        }
    }, [isError]);

    const errorModal = useRef(null);
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <nav>{/* Header main nav will come here */}</nav>
                <Routes>
                    <Route path="/test" element={<Test2 />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/detail/:pageId" element={<DetailPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            <ErrorModal ref={errorModal} />
        </QueryClientProvider>
    );
}

export default App;
