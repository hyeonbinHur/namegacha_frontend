import './ChatBox.css';
import { useSelector, useDispatch } from 'react-redux';
import * as aiAPI from '../../../utils/api/aws/aiRoutes';
import { setThread, setMessages } from '../../../store/threadSlice';

export default function ChatBox() {
    const currentThread = useSelector(
        (state) => state.currentThread.currentThread
    );

    // const currentMessages = useSelector(
    //     (state) => state.currentThread.messages
    // );

    const dispatch = useDispatch();

    const createSetThread = async () => {
        try {
            const response = await aiAPI.createThread();
            dispatch(setThread({ newThread: response }));
            return true;
        } catch (err) {
            return false;
        }
    };

    const sendMessage = async () => {
        console.log('send message start');
        if (currentThread === null) {
            const response = await createSetThread();
            if (response === true) {
                try {
                    const sendMessageResponse = await aiAPI.sendMessage(
                        currentThread,
                        'function, camel case, check whether character is dead or not'
                    );
                    return sendMessageResponse;
                } catch (err) {
                    return false;
                }
            }
        } else {
            try {
                const sendMessageResponse = await aiAPI.sendMessage(
                    currentThread,
                    'function, camel case, check whether character is dead or not'
                );
                return sendMessageResponse;
            } catch (err) {
                return false;
            }
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
                dispatch(setMessages({ messages: messages.data }));
            } else if (status === undefined) {
                return;
            } else {
                setTimeout(() => readReply(runId), 5000); // Wait for 5 seconds before retrying
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const chatAI = async () => {
        console.log('chat AI start');
        const sendMessageFlag = await sendMessage();
        if (sendMessageFlag !== false) {
            console.log(currentThread);
            await readReply(sendMessageFlag);
        }
    };

    return (
        <div className="chat-box-container">
            <button onClick={() => console.log(currentThread)}>
                show current thread
            </button>

            <button onClick={() => createSetThread()}> create Thread</button>

            {/* <button onClick={() => console.log(reply)}>show reply</button> */}

            <div className="chat-content-container">
                <input className="user-input-content" type="text" />

                <div className="chat-button-container">
                    <div className="name-style-container">
                        <button>Camel</button>
                        <button>Pascal</button>
                        <button>Snake</button>
                    </div>

                    <div>
                        <button onClick={() => chatAI()}>send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
