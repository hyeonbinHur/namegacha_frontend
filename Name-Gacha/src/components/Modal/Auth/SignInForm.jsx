import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
export default function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { mutate: mutateSigIn } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signInUser(userId, userPassword);
        },
    });
    const componentSingnIn = (e) => {
        e.preventDefault();
        mutateSigIn({ userId: username, userPassword: password });
    };
    // 아이디 5글자 이상
    // 비번 7글자 이상
    // 모든 칸이 채워지지 않았다면 버튼 disable

    return (
        <div>
            <form action={componentSingnIn}>
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
                </div>
                <div>
                    <button>submit</button>
                </div>
            </form>
        </div>
    );
}
