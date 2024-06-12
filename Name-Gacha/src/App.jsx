import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Test2 from './pages/Test2';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <nav>{/* Header main nav will come here */}</nav>
            <Routes>
                <Route path="/test" element={<Test2 />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
