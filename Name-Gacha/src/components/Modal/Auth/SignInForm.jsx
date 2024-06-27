/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';

export default function SignInForm({ toSignUp }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: mutateSigIn } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signInUser(userId, userPassword);
        },
    });
    const componentSignIn = () => {
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
            <form>
                <div>
                    <input
                        type="text"
                        name="username"
                        required
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                    {emailIsValid && (
                        <div>username must be longer than 5 letters</div>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        required
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                    {passwordIsValid && (
                        <div>password must be longer than 7 letters</div>
                    )}
                </div>
                <div>
                    <button type="submit" onClick={() => componentSignIn()}>
                        submit
                    </button>
                    <button type="button" onClick={() => toSignUp()}>
                        Go to Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
