/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import UserMessage from './UserMessage/UserMessage.jsx';
import AiMessage from './AiMessage/AiMessage';
import { useEffect, useState } from 'react';
export default function ChatResult() {
    const globalThreadType = useSelector(
        (state) => state.currentThread.globalThreadType
    );
    const functionMessages = useSelector(
        (state) => state.currentThread.functionMessages
    );
    const variableMessages = useSelector(
        (state) => state.currentThread.variableMessages
    );
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (globalThreadType === 'variable') {
            setMessages(variableMessages);
        } else {
            setMessages(functionMessages);
        }
    }, [globalThreadType, functionMessages, variableMessages]);

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
                            <UserMessage key={index} message={m} />
                        ) : (
                            <AiMessage
                                key={index}
                                message={m}
                                arrayIndex={index}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
