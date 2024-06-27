/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';

export default function SignUpForm({ toSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { mutate: mutateSignUp } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signUpUser(userId, userPassword);
        },
    });

    const componentSignUp = () => {
        mutateSignUp({ userId: username, userPassword: password });
    };

    const emailIsVaild =
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
            <form>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                    {emailIsVaild && (
                        <div> username must be longger than 5 letters</div>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="username">Password</label>
                    {passwordIsValid && (
                        <div>password must be longger than 7 letters</div>
                    )}
                    <div>
                        <input
                            type="password"
                            id="passwordCheck"
                            name="passwordCheck"
                            required
                            placeholder="Check your password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                        <label htmlFor="username">Check your password</label>
                        {passCheckIsValid && (
                            <div>Passwords are not match!</div>
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={() => componentSignUp()}>Sign up</button>
                    <button type="button" onClick={toSignIn}>
                        Go to Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}
