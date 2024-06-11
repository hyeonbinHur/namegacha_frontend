import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import Test from './pages/Test';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <nav>{/* Header main nav will come here */}</nav>
            <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
