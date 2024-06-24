/* eslint-disable react/prop-types */
import ExpCard from './ExpCard';
import NameCard from './NameCard';

export default function AiMessage({ message }) {
    const messageObj = JSON.parse(message);
    const name = messageObj.Names;
    const exp = messageObj.Exp;
    return (
        <div style={{ padding: '0rem 3rem', border: '1px solid black' }}>
            <ul>
                <NameCard names={name} />
            </ul>
            <div>
                Exp:
                <ExpCard exp={exp} />
            </div>
        </div>
    );
}
