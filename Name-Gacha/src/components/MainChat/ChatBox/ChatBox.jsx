import './ChatBox.css';
export default function ChatBox() {
    return (
        <div className="chat-box-container">
            <div className="chat-content-container">
                <input className="user-input-content" type="text" />

                <div className="chat-button-container">
                    <div className="name-style-container">
                        <button>Camel</button>
                        <button>Pascal</button>
                        <button>Snake</button>
                    </div>

                    <div>
                        <button>send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
