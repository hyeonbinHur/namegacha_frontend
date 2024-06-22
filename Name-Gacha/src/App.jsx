import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Test2 from './pages/Test2';
import ErrorPage from './pages/ErrorPage';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <nav>{/* Header main nav will come here */}</nav>
            <Routes>
                <Route
                    path="/test"
                    element={<Test2 />}
                    errorElement={<ErrorPage />}
                />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                    path="/detail/:pageId"
                    element={<DetailPage />}
                    errorElement={<ErrorPage />}
                />
                <Route
                    path="/"
                    element={<MainPage />}
                    errorElement={<ErrorPage />}
                />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
