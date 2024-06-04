import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import './MainPage.css';

export default function MainPage() {
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
