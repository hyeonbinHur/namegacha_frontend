/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/errorSlice';
import { createPortal } from 'react-dom';

const ErrorModal = forwardRef(function ErrorModal(props, ref) {
    const modal = useRef(null);

    const sliceError = useSelector((state) => state.errorSlice.error);
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
                <div>{sliceError}</div>
                <div>Hello I am Error</div>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default ErrorModal;
