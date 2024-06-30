/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import UserMessage from './UserMessage/UserMessage.jsx';
import AiMessage from './AiMessage/AiMessage';
import { useEffect, useState } from 'react';
import NoMsg from '../../../assets/svgs/no-messages.svg';

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
        <div className="chat--result--content">
            {messages.length == 0 ? (
                <div className="chat--result__no-message">
                    <img
                        src={NoMsg}
                        alt="No message image"
                        className="chat--result__no-message__img"
                    />
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
