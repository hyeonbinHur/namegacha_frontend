import ChatBox from './ChatBox/ChatBox';
import './MainChat.css';
export default function MainChat() {
    return (
        <div className="mainChant-container">
            <div className="chat-header"></div>
            <div className="chat-result"></div>
            <div className="chat-box">
                <ChatBox />
            </div>
        </div>
    );
}
