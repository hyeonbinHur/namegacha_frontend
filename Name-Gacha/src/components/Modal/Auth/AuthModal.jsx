import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthModal = forwardRef(function AuthModal(props, ref) {
    const modal = useRef(null);
    const [isSignIn, setIsSignIn] = useState(true);
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
    /* need to implemente cancel sign in & sign up action */
    const toggleForm = () => {
        setIsSignIn((prev) => !prev);
    };
    return createPortal(
        <div>
            <dialog>
                <div>
                    <button onClick={ref.current.close()}>close</button>
                </div>

                <div>
                    {isSignIn ? (
                        <SignInForm toSignIn={toggleForm} />
                    ) : (
                        <SignUpForm toSignIn={toggleForm} />
                    )}
                </div>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default AuthModal;
