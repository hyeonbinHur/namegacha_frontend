import { useSelector } from 'react-redux';
import UserMessage from './UserMessage/UserMessage.jsx';
import AiMessage from './AiMessage/AiMessage';

export default function ChatResult() {
    const messages = useSelector((state) => state.currentThread.messages);

    return (
        <div>
            {messages.length == 0 ? (
                <div>
                    no messages yet
                    <button onClick={() => console.log(messages)}>
                        messages
                    </button>
                </div>
            ) : (
                <div>
                    {messages.map((m, index) => {
                        // Log the message for debugging purposes
                        console.log(m);
                        // Conditionally render UserMessage or AiMessage based on index
                        return index % 2 === 0 ? (
                            <UserMessage
                                index={index}
                                key={index}
                                message={m[0].text.value}
                            />
                        ) : (
                            <AiMessage
                                key={index}
                                index={index}
                                message={m[0].text.value}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
