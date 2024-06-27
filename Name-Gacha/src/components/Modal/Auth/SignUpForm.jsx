/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';
import { AiOutlineRobot } from 'react-icons/ai';
import blackLogo from '../../../assets/logo/black-logo-full.png';

export default function SignUpForm({ toSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { mutate: mutateSignUp } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signUpUser(userId, userPassword);
        },
        onSuccess: () => toSignIn(),
    });

    const componentSignUp = () => {
        mutateSignUp({ userId: username, userPassword: password });
    };

    const emailIsValid =
        authUtil.isNotEmpty(username) && !authUtil.checkIdValidation(username);

    const passwordIsValid =
        authUtil.isNotEmpty(password) &&
        !authUtil.checkPasswordValidation(password);

    const passCheckIsValid =
        authUtil.isNotEmpty(passwordCheck) &&
        !authUtil.checkIsPasswordMatch(password, passwordCheck);

    //아이디 5글자 이상 비번 7글자 이상
    //비번 체크가 일치하지 않으면 버튼 disable,
    //모든 칸이 채워지지 않았다면 버튼 disable
    return (
        <div>
            <form className="sign-in-form">
                <div>
                    <div>
                        <h2 className="heading-secondary">
                            Sign Up to Name Gacha
                        </h2>
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
                </div>
                <div>
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
                </div>
                <div>
                    <button
                        className="sign-in-form--btn__submit btn-round"
                        onClick={() => componentSignUp()}
                    >
                        Sign up
                    </button>
                    <button
                        className="sign-in-form--btn__navigate btn-text"
                        type="button"
                        onClick={toSignIn}
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <div className="auth-logo-box">
                <div className="item-horizontal-center">
                    <AiOutlineRobot className="auth-logo-box--robot" />
                </div>
                <img src={blackLogo} className="auth-logo-box--logo" />
            </div>
        </div>
    );
}
