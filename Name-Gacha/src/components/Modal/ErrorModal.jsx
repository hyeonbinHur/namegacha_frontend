/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';

const ErrorModal = forwardRef(function ErrorModal({ error }, ref) {
    const modal = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modal.current.showModal();
            },
            close: () => {
                modal.current.close();
            },
        };
    });

    return (
        <div>
            <button onClick={() => modal.current.close()}>close</button>
            <dialog ref={modal}>{error}</dialog>
        </div>
    );
});

export default ErrorModal;
