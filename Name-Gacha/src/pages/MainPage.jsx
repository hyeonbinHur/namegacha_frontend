import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import './MainPage.css';
import { useAuthContext } from '../hooks/useAuthContext';

export default function MainPage() {
    const { user } = useAuthContext();
    return (
        <div className="Main-container">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="mainChat">
                <MainChat />
            </div>
        </div>
    );
}
