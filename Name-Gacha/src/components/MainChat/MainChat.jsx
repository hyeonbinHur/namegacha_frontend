import ChatBox from './ChatBox/ChatBox';
import ChatResult from './ChatResult/ChatResult';
import './MainChat.css';
export default function MainChat() {
    return (
        <div className="mainChant-container">
            <div className="chat-header"></div>
            <div className="chat-result">
                <ChatResult />
            </div>
            <div className="chat-box">
                <ChatBox />
            </div>
        </div>
    );
}
