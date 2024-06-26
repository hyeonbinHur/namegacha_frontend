import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
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
        <main className="main" onClick={(e) => handleContextMenuClose(e)}>
            <aside className="main--sidebar">
                <SideBar />
            </aside>

            <section className="main--main">
                <Routes>
                    <Route path="/" element={<WrappedMainChat />} />
                    <Route
                        path="/detail/:pageId"
                        element={<WrappedDetailPage />}
                    />
                </Routes>
            </section>
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
