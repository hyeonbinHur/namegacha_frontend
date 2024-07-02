/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import * as aiAPI from '../../../utils/api/aws/aiRoutes';
import {
    setThread,
    pushAiMessages,
    pushUserMessages,
} from '../../../store/threadSlice';
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
    const [userMessageTemp, setUserMessageTemp] = useState('');
    const [selectedType, setSelectedType] = useState('camel case');
    const [userMessageFormatted, setUserMessageFormatted] = useState({
        nameType: 'Name type : ' + selectedType,
        definition: 'Definition : ' + userMessage,
        identifier: 'Identifier : ' + globalThreadType,
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isCreateNewThread && currentThread !== null) {
            chatAI();
        }
    }, [currentThread, isCreateNewThread]);
    useEffect(() => {
        if (globalThreadType === 'variable') {
            setCurrentThread(currentVariableThread);
            setUserMessageFormatted((prev) => ({
                ...prev,
                identifier: 'Identifier : variable',
            }));
        } else {
            setCurrentThread(currentFunctionThread);
            setUserMessageFormatted((prev) => ({
                ...prev,
                identifier: 'Identifier : function',
            }));
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
        try {
            const sendMessageResponse = await aiAPI.sendMessage(
                currentThread,
                userMessageFormatted
            );
            dispatch(
                pushUserMessages({
                    message: userMessageTemp,
                })

                ///이게 문제네
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
                dispatch(
                    pushAiMessages({
                        message: messages.data.messages[0],
                    })
                );
                setIsLoading(false);
            } else if (status === undefined) {
                setIsLoading(false);
                return;
            } else {
                setTimeout(() => readReply(runId), 2000); // Wait for 2 seconds before retrying
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const chatAI = async () => {
        setIsLoading(true);
        setUserMessage('');
        if (currentThread === null && !isCreateNewThread) {
            createSetThread();
            setIsCreateNewThread(true);
        } else {
            const runId = await sendMessage();
            console.log(runId);
            if (runId !== false) {
                await readReply(runId);
                setIsCreateNewThread(false);
            }
            setUserMessageTemp('');
        }
    };
    const typeOnChange = (event) => {
        const value = event.target.value;
        console.log(value);
        setSelectedType(value);
        setUserMessageFormatted((prevState) => ({
            ...prevState,
            nameType: 'Name type : ' + value,
        }));
    };

    return (
        <div className="chat--box--container">
            {isLoading && <div className="loading-main"> </div>}

            <textarea
                className="chat--box__input"
                type="text"
                value={userMessage}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setUserMessage(newValue);
                    setUserMessageTemp(newValue);
                    setUserMessageFormatted((prevState) => ({
                        ...prevState,
                        definition: 'Definition : ' + newValue,
                    }));
                }}
            />

            <div className="chat--box__buttons">
                <div className="chat--box__buttons__type">
                    <button className="chat--box__button">Camel</button>
                    <button className="chat--box__button">Pascal</button>
                    <button className="chat--box__button">Snake</button>

                    <input
                        type="radio"
                        id="camel"
                        name="name-type"
                        value="camel case"
                        checked={selectedType === 'camel case'}
                        onChange={typeOnChange}
                    />
                    <label htmlFor="camel">Camel</label>
                    <input
                        type="radio"
                        id="pascal"
                        name="name-type"
                        value="pascal case"
                        checked={selectedType === 'pascal case'}
                        onChange={typeOnChange}
                    />
                    <label htmlFor="pascal">Pascal</label>
                    <input
                        type="radio"
                        id="snake"
                        name="name-type"
                        value="snake case"
                        checked={selectedType === 'snake case'}
                        onChange={typeOnChange}
                    />
                    <label htmlFor="snake">Snake</label>

                    <button onClick={() => console.log(userMessageFormatted)}>
                        console
                    </button>
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
