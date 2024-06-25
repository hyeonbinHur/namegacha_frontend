/* eslint-disable react/prop-types */
import ExpCard from './ExpCard';
import NameCard from './NameCard';
import { useDispatch } from 'react-redux';
import { openIdentifierModal } from '../../../../store/identifiyerModal';
import { useState } from 'react';

export default function AiMessage({ message }) {
    const messageObj = JSON.parse(message);
    const name = messageObj.Names;
    const [exp, setExp] = useState(messageObj.Exp);

    const handleExpEdit = (event) => {
        setExp(event.target.value);
    };

    const cancelExpEdit = () => {
        setExp(exp);
    };

    const dispatch = useDispatch();

    const selectNewItem = (name) => {
        dispatch(openIdentifierModal({ name: name, exp: exp }));
    };
    return (
        <div style={{ padding: '0rem 3rem', border: '1px solid black' }}>
            <ul>
                <NameCard names={name} selectNewItem={selectNewItem} />
            </ul>
            <div>
                Exp:
                <ExpCard exp={exp} handleExpChange={handleExpChange} />
            </div>
        </div>
    );
}
