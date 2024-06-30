/* eslint-disable react-hooks/exhaustive-deps */
import './ChatBox.css';
import { useSelector, useDispatch } from 'react-redux';
import * as aiAPI from '../../../utils/api/aws/aiRoutes';
import { setThread, pushMessages } from '../../../store/threadSlice';
import { useEffect, useState } from 'react';

export default function ChatBox() {
    const currentVariableThread = useSelector(
        (state) => state.currentThread.currentVariableThread
    );

    const globalThreadType = useSelector(
        (state) => state.currentThread.globalThreadType
    );

    const currentFunctionThread = useSelector(
        (state) => state.currentThread.currentFunctionthread
    );

    const [userMessage, setUserMessage] = useState('');
    const [currentThread, setCurrentThread] = useState(currentVariableThread);
    const [isCreateNewThread, setIsCreateNewThread] = useState(false);

    useEffect(() => {
        if (isCreateNewThread && currentThread !== null) {
            chatAI();
        }
    }, [currentThread, isCreateNewThread]);

    useEffect(() => {
        if (globalThreadType === 'variable') {
            console.log('variable thread');
            setCurrentThread(currentVariableThread);
        } else {
            console.log('function thread');
            setCurrentThread(currentFunctionThread);
        }
    }, [globalThreadType]);

    const dispatch = useDispatch();

    const createSetThread = async () => {
        console.log('create thread start');
        try {
            const response = await aiAPI.createThread();
            console.log(response);
            setCurrentThread(response);
            dispatch(setThread({ newThread: response }));
            return true;
        } catch (err) {
            return false;
        }
    };

    const sendMessage = async () => {
        console.log('send message start');
        try {
            const sendMessageResponse = await aiAPI.sendMessage(
                currentThread,
                userMessage
            );
            return sendMessageResponse;
        } catch (err) {
            return false;
        }
    };

    const checkStatus = async (runId) => {
        try {
            const responseStatus = await aiAPI.checkStatus(
                currentThread,
                runId
            );
            return responseStatus;
        } catch (err) {
            console.error(err);
        }
    };
    const readReply = async (runId) => {
        try {
            console.log('read reply start');
            const status = await checkStatus(runId);
            console.log('current status : ' + status);
            if (status === 'completed') {
                const messages = await aiAPI.readMessages(currentThread);
                // dispatch(setMessages({ messages: messages.data }));
                dispatch(
                    pushMessages({
                        aiMessage: messages.data.messages[0],
                        userMessage: messages.data.messages[1],
                    })
                );
            } else if (status === undefined) {
                return;
            } else {
                setTimeout(() => readReply(runId), 2000); // Wait for 2 seconds before retrying
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    const chatAI = async () => {
        if (currentThread === null && !isCreateNewThread) {
            console.log('create Thread');
            createSetThread();
            setIsCreateNewThread(true);
        } else {
            console.log('chat AI start');
            console.log(currentThread);
            const runId = await sendMessage();
            if (runId !== false) {
                console.log(runId);
                await readReply(runId);
                setIsCreateNewThread(false);
                setUserMessage('');
            }
        }
    };
    return (
        <div className="chat--box--container">
            <textarea
                className="chat--box__input"
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <div className="chat--box__buttons">
                <div className="chat--box__buttons__type">
                    <button className="chat--box__button">Camel</button>
                    <button className="chat--box__button">Pascal</button>
                    <button className="chat--box__button">Snake</button>
                </div>
                {userMessage.length > 0 ? (
                    <button
                        className="chat--box__button--send__active"
                        onClick={() => chatAI()}
                    >
                        Send
                    </button>
                ) : (
                    <button className="chat--box__button--send__inactive">
                        Send
                    </button>
                )}
            </div>
        </div>
    );
}
