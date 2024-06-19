import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import './MainPage.css';
import { useDispatch } from 'react-redux';
import { closeContextMenu } from '../store/contextMenuSlice';

export default function MainPage() {
    const dispatch = useDispatch();
    const handleContextMenuClose = (e) => {
        e.preventDefault();
        dispatch(closeContextMenu());
    };
    return (
        <div
            className="Main-container"
            onClick={(e) => handleContextMenuClose(e)}
        >
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="mainChat">
                <MainChat />
            </div>
        </div>
    );
}
