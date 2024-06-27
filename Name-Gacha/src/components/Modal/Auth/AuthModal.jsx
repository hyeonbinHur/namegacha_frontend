import { CgClose } from 'react-icons/cg';
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
            <dialog ref={modal} className="modal auth-modal">
                <div className="close-box item-left">
                    <CgClose
                        className="close-box--close"
                        onClick={() => ref.current.close()}
                    />
                </div>
                <section className="auth-section">
                    {isSignIn ? (
                        <SignInForm
                            toSignUp={toggleForm}
                            close={() => ref.current && ref.current.close()}
                        />
                    ) : (
                        <SignUpForm toSignIn={toggleForm} />
                    )}
                </section>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default AuthModal;
