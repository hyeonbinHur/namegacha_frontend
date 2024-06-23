/* eslint-disable react/prop-types */
import ExpCard from './ExpCard';
import NameCard from './NameCard';

export default function AiMessage({ message }) {
    const messageObj = JSON.parse(message);
    const name = messageObj.names;
    const exp = messageObj.exp;
    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            <NameCard names={name} />
            <ExpCard exp={exp} />
        </div>
    );
}
