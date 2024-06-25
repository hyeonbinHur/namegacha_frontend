import ChatBox from './ChatBox/ChatBox';
import ChatResult from './ChatResult/ChatResult';
import './MainChat.css';
import IdentifierModal from '../Modal/IdentifierModal';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../hooks/useAuthContext';
import { chageGlobalThreadType } from '../../store/threadSlice';

export default function MainChat() {
    const { user } = useAuthContext();
    const dispatch = useDispatch();
    const sliceIdentifierIsOpen = useSelector(
        (state) => state.identifierModalSlice.isOpen
    );

    useEffect(() => {
        if (sliceIdentifierIsOpen) {
            identifierModal.current.open();
        } else {
            identifierModal.current.close();
        }
    }, [sliceIdentifierIsOpen]);

    const identifierModal = useRef(null);

    const changeGlobalToVar = () => {
        dispatch(chageGlobalThreadType({ globaltype: 'variable' }));
    };
    const changeGlobalTypeToFn = () => {
        dispatch(chageGlobalThreadType({ globaltype: 'function' }));
    };

    return (
        <div className="mainChant-container">
            <div className="chat-header"></div>

            <div className="chat-result">
                <button onClick={() => changeGlobalToVar()}>Variable</button>
                <button onClick={() => changeGlobalTypeToFn()}>Function</button>
                <button onClick={() => console.log(user)}> user info</button>
                <ChatResult />
            </div>

            <div className="chat-box">
                <ChatBox />
            </div>

            <IdentifierModal ref={identifierModal} user={user} />
        </div>
    );
}
