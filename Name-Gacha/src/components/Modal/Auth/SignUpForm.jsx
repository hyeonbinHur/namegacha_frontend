/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';

export default function SignUpForm({ toSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    /**http request */

    const { mutate: mutateSignUp } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signUpUser(userId, userPassword);
        },
        onSuccess: (response) => {
            console.log(response);
            if (response.status === 409) {
                console.log('user already existing');
            } else if (response.status === 200) {
                toSignIn();
            } else {
                console.log('undexpected error has been occured');
            }
        },
    });
    /**basic functions */

    const componentSignUp = () => {
        if (
            authUtil.isNotEmpty(username) &&
            authUtil.isNotEmpty(password) &&
            authUtil.isNotEmpty(passwordCheck)
        ) {
            if (!emailIsValid && !passwordIsValid && !passCheckIsValid) {
                mutateSignUp({ userId: username, userPassword: password });
            } else {
                console.log('요구사항을 확인해주세요');
                //ui 업데이터
            }
        } else {
            console.log('폼을 먼저 다 채우세요');
            //ui 업데이터
        }
    };

    const emailIsValid =
        authUtil.isNotEmpty(username) && !authUtil.checkIdValidation(username);

    const passwordIsValid =
        authUtil.isNotEmpty(password) &&
        !authUtil.checkPasswordValidation(password);

    const passCheckIsValid =
        authUtil.isNotEmpty(passwordCheck) &&
        !authUtil.checkIsPasswordMatch(password, passwordCheck);

    return (
        <div>
            <form className="sign-in-form">
                <div className="item-horizontal-center">
                    <div className="auth-heading-container item-horizontal-center">
                        <h2 className="heading-secondary">
                            Sign Up to Name Gacha
                        </h2>

                        <h3 className="heading-tertiary">
                            Let's join to generate name!
                        </h3>
                    </div>
                    <input
                        className="sign-in-form--input"
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {emailIsValid ? (
                        <label className="sign-in-form--label label__invalid ">
                            username must be longer than 5 letters
                        </label>
                    ) : (
                        <label
                            className="sign-in-form--label label__valid"
                            htmlFor="username"
                        >
                            Username
                        </label>
                    )}
                    <input
                        className="sign-in-form--input"
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordIsValid ? (
                        <label className="sign-in-form--label label__invalid">
                            Password must be longer than 7 letters
                        </label>
                    ) : (
                        <label className="sign-in-form--label label__valid">
                            Password
                        </label>
                    )}
                    <input
                        className="sign-in-form--input"
                        type="password"
                        id="passwordCheck"
                        name="passwordCheck"
                        required
                        placeholder="Check your password"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                    {passCheckIsValid ? (
                        <label className="sign-in-form--label label__invalid">
                            Passwords are not match!
                        </label>
                    ) : (
                        <label className="sign-in-form--label label__valid">
                            Password Check
                        </label>
                    )}

                    <button
                        className="sign-in-form--btn__submit btn-round"
                        onClick={() => componentSignUp()}
                        type="button"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
