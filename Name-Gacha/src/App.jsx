import { useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Test2 from './pages/Test2';
import ErrorModal from './components/Modal/ErrorModal.jsx';
import { setError } from './store/errorSlice.js';

function App() {
    const errorModal = useRef(null);
    const isError = useSelector((state) => state.errorSlice.isError);
    const dispatch = useDispatch();

    // Define the error handler function
    const apiErrorHandler = (error) => {
        console.log('API Error Handler Called:', error);
        const serviceCode = error?.response?.data?.code;
        const httpMessage = error?.response?.data?.message;
        dispatch(setError({ message: httpMessage, code: serviceCode }));
    };

    // Initialize the query client with error handling
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                onError: apiErrorHandler,
            },
            mutations: {
                onError: apiErrorHandler,
            },
        },
    });

    // UseEffect to open/close modal based on error state
    useEffect(() => {
        if (isError) {
            errorModal.current.open();
        } else {
            errorModal.current.close();
        }
    }, [isError]);

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
