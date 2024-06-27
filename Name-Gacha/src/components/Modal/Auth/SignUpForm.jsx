import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const { mutate: mutateSignUp } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signUpUser(userId, userPassword);
        },
    });

    const componentSignUp = (e) => {
        e.preventDefault();
        mutateSignUp({ userId: username, userPassword: password });
    };
    //아이디 5글자 이상 비번 7글자 이상

    //비번 체크가 일치하지 않으면 버튼 disable,
    //모든 칸이 채워지지 않았다면 버튼 disable
    return (
        <div>
            <form action={componentSignUp}>
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
                    <label htmlFor="username">Username</label>
                    <input
                        type="password"
                        id="passwordCheck"
                        name="passwordCheck"
                        required
                        placeholder="Check your password"
                        value={passwordCheck}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div>
                    <button>Sign up</button>
                </div>
            </form>
        </div>
    );
}
