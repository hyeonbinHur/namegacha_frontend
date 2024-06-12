import axios from 'axios';
import { useState } from 'react';

export default function Test2() {
    const [threadId, setThread] = useState(null);
    const [runId, setRunId] = useState(null);

    const createThread = async () => {
        try {
            const response = await axios.get(
                'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=thread'
            );
            const resposeThreadId = response.data;
            setThread(resposeThreadId);
            console.log(resposeThreadId);
        } catch (err) {
            console.error(err);
        }
    };

    const readMessages = async () => {
        try {
            const response = await axios.get(
                `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=messages&threadId=${threadId}`
            );
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async () => {
        try {
            const body = {
                threadId: threadId,
                message:
                    'I want to create function, camel case, the function to check whether character is dead or not',
            };
            const endPoint =
                'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai';
            const response = await axios.post(endPoint, body);
            const resposeRunId = response.data;
            setRunId(resposeRunId);
            console.log(response);
            console.log(resposeRunId);
        } catch (err) {
            console.error(err);
        }
    };
    const chectStatus = async () => {
        try {
            const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=status&threadId=${threadId}&runId=${runId}`;
            const response = await axios.get(endPoint);
            const status = response.data;
            console.log(response);
            console.log(status);
        } catch (err) {
            console.error(err.message);
        }
    };
    const readReply = async () => {
        try {
            const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=reply&threadId=${threadId}`;
            const response = await axios.get(endPoint);
            const reply = response.data;
            console.log(reply[0].text.value);
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div style={{ display: 'flex' }}>
            <button onClick={() => createThread()}>create thread button</button>
            <button onClick={() => readMessages()}>read message button</button>
            <button onClick={() => sendMessage()}>send message button</button>
            <button onClick={() => chectStatus()}>check status button</button>
            <button onClick={() => readReply()}>get reply button</button>
        </div>
    );
}
