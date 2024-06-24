/* eslint-disable react/prop-types */
import ExpCard from './ExpCard';
import NameCard from './NameCard';
import { useDispatch } from 'react-redux';
import { openIdentifierModal } from '../../../../store/identifiyerModal';

export default function AiMessage({ message }) {
    const messageObj = JSON.parse(message);
    const name = messageObj.Names;
    const exp = messageObj.Exp;
    const dispatch = useDispatch();
    const selectNewItem = (name) => {
        dispatch(openIdentifierModal({ nam: name, exp: exp }));
    };

    return (
        <div style={{ padding: '0rem 3rem', border: '1px solid black' }}>
            <ul>
                <NameCard names={name} selectNewItem={selectNewItem} />
            </ul>
            <div>
                Exp:
                <ExpCard exp={exp} />
            </div>
        </div>
    );
}
