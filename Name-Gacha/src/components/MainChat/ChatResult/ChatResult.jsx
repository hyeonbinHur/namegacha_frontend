import { useSelector } from 'react-redux';
import UserMessage from './UserMessage/UserMessage';
import AiMessage from './AiMessage/AiMessage';

export default function ChatResult() {
    const messages = useSelector((state) => state.currentThread.messages);

    return (
        <div>
            {!messages.messages ? (
                <div> no messages yet</div>
            ) : (
                <div>
                    {messages.messages.map((m, index) => {
                        // Log the message for debugging purposes
                        console.log(m);

                        // Conditionally render UserMessage or AiMessage based on index
                        return index % 2 === 0 ? (
                            <UserMessage
                                key={index}
                                message={m[0].text.value}
                            />
                        ) : (
                            <AiMessage key={index} message={m[0].text.value} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
