import * as auth from '../../utils/api/authData';

export default function LoginForm() {
    const formStyle = {
        margin: '50px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '80%',
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    };

    const signUpTest = async (e) => {
        e.preventDefault();
        const form = e.target; // 이벤트 타겟에서 폼 요소를 가져옵니다.
        const id = form.username.value; // 폼 요소의 name 속성을 사용하여 값을 가져옵니다.
        const pw = form.password.value;
        console.log('Form submitted');
        console.log('Username:', id);
        console.log('Password:', pw);
        try {
            const response = await auth.createUser(id, pw);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
        // 여기에 추가적인 처리 로직을 넣으세요.
    };

    const signInTest = async (e) => {
        e.preventDefault();
        const form = e.target; // 이벤트 타겟에서 폼 요소를 가져옵니다.
        const id = form.username.value; // 폼 요소의 name 속성을 사용하여 값을 가져옵니다.
        const pw = form.password.value;
        console.log('Form submitted');
        console.log('Username:', id);
        console.log('Password:', pw);
        try {
            const response = await auth.signInUser(id, pw);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
        // 여기에 추가적인 처리 로직을 넣으세요.
    };

    const accCheck = async () => {
        const response = await auth.checkAccessToken();
        console.log(response);
    };

    const refCheck = async () => {
        const response = await auth.checkRefreshToken();
        console.log(response);
    };

    return (
        <div>
            <button onClick={() => accCheck()}>Accss token check</button>
            <div>
                <button onClick={() => refCheck()}>Refresh Token</button>
            </div>
            <div style={formStyle}>
                <h2>SIGN UP FORM</h2>
                <form onSubmit={signUpTest} style={{ width: '100%' }}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <button type="submit" style={buttonStyle}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div style={formStyle}>
                <h2>SIGN IN FORM</h2>
                <form onSubmit={signInTest} style={{ width: '100%' }}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <button type="submit" style={buttonStyle}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
