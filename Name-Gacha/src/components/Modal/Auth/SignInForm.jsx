/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';

export default function SignInForm({ close }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: mutateSigIn } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signInUser(userId, userPassword);
        },

        onSuccess: () => close(),
    });
    const componentSignIn = () => {
        console.log('sign in ');
        mutateSigIn({ userId: username, userPassword: password });
    };

    // 로그인 유효성 검사 변수들
    const emailIsValid =
        authUtil.isNotEmpty(username) && !authUtil.checkIdValidation(username);
    const passwordIsValid =
        authUtil.isNotEmpty(password) &&
        !authUtil.checkPasswordValidation(password);

    return (
        <div>
            <form className="sign-in-form">
                <div className="item-horizontal-center">
                    <div className="auth-heading-container item-horizontal-center">
                        <h2 className="heading-secondary">
                            Sign In to Name Gacha
                        </h2>

                        <h3 className="heading-tertiary">
                            Let's join to generate name!
                        </h3>
                    </div>
                    <input
                        className="sign-in-form--input"
                        type="text"
                        name="username"
                        required
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {emailIsValid ? (
                        <label className="sign-in-form--label label__invalid">
                            Username must be longer than 5 letters
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
                        name="password"
                        required
                        id="password"
                        placeholder="Password"
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
                    <button
                        className="sign-in-form--btn__submit btn-round"
                        type="button"
                        onClick={() => componentSignIn()}
                    >
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
}
