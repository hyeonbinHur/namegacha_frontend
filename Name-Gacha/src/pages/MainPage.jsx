import SideBar from '../components/Sidebar/SideBar';
import MainChat from '../components/MainChat/MainChat';
import './MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeContextMenu } from '../store/contextMenuSlice';
import ErrorModal from '../components/Modal/ErrorModal';
import { useEffect, useRef } from 'react';

export default function MainPage() {
    const dispatch = useDispatch();
    const handleContextMenuClose = (e) => {
        e.preventDefault();
        dispatch(closeContextMenu());
    };
    const isError = useSelector((state) => state.errorSlice.isError);
    const errorModal = useRef(null);

    useEffect(() => {
        if (isError === true) {
            errorModal.current.open();
        }
    }, [isError]);

    return (
        <div
            className="Main-container"
            onClick={(e) => handleContextMenuClose(e)}
        >
            <div className="sidebar">
                <SideBar />
            </div>

            <div className="mainChat">
                <MainChat />
            </div>

            <ErrorModal ref={errorModal} />
        </div>
    );
}
