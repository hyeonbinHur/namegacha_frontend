import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../utils/api/aws/authRoutes';

export default function SignInForm() {
    const { mutate: mutateSigIn } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signInUser(userId, userPassword);
        },
    });
    const componentSingnIn = (e) => {
        e.preventDefault();
        const form = e.target;
        mutateSigIn({ userId: form.username, userPassword: form.password });
    };

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
