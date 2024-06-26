import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import './MainPage.css';
import { useDispatch } from 'react-redux';
import { closeContextMenu } from '../store/contextMenuSlice';
import DetailPage from './DetailPage';
import { Routes, Route } from 'react-router-dom';

export default function MainPage() {
    const dispatch = useDispatch();
    const handleContextMenuClose = (e) => {
        e.preventDefault();
        dispatch(closeContextMenu());
    };

    return (
        <main
            className="Main-container"
            onClick={(e) => handleContextMenuClose(e)}
        >
            <aside className="sidebar">
                <SideBar />
            </aside>

            <Routes>
                <Route path="/" element={<WrappedMainChat />} />
                <Route path="/detail/:pageId" element={<WrappedDetailPage />} />
            </Routes>
        </main>
    );
}
function WrappedMainChat() {
    return (
        <div className="mainChat">
            <MainChat />
        </div>
    );
}

function WrappedDetailPage() {
    return (
        <div className="mainChat">
            <DetailPage />
        </div>
    );
}
