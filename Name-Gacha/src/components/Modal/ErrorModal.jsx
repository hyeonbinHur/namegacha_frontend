/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/errorSlice';
import { createPortal } from 'react-dom';

const ErrorModal = forwardRef(function ErrorModal(props, ref) {
    const modal = useRef(null);

    const sliceErrorCode = useSelector((state) => state.errorSlice.errorCode);
    const sliceErrorMessage = useSelector(
        (state) => state.errorSlice.errorMessage
    );
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modal.current.showModal();
            },
            close: () => {
                dispatch(clearError());
                modal.current.close();
            },
        };
    });

    return createPortal(
        <div>
            <dialog ref={modal}>
                <button onClick={() => ref.current.close()}>close</button>
                <div>{sliceErrorCode}</div>
                <div>{sliceErrorMessage}</div>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default ErrorModal;
