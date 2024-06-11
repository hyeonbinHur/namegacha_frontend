import axios from 'axios';

const authEndpoint =
    'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth';

async function signUpUser(userId, userPassword) {
    //post
    try {
        const body = {
            content: 'sign up',
            userId: userId,
            userPassword: userPassword,
        };
        const response = await axios.post(authEndpoint, body);
        return response;
    } catch (err) {
        console.error(err.message);
    }
}
async function signInUser(userId, userPassword) {
    //post
    try {
        const body = {
            content: 'sign in',
            userId: userId,
            userPassword: userPassword,
        };
        const response = await axios.post(authEndpoint, body, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        console.error('SignIn Error: ', err.response || err.message);
    }
}
async function signOutUser() {
    //post
    try {
        const body = {
            content: 'sign out',
        };
        const response = await axios.post(authEndpoint, body, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        console.error(err.message);
    }
}
async function accessToken() {
    //post
    try {
        const body = {
            content: 'access token',
        };
        const response = await axios.post(authEndpoint, body, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        console.error(err.message);
    }
}
async function refreshToken() {
    //post
    //post
    try {
        const body = {
            content: 'refresh token',
        };
        const response = await axios.post(authEndpoint, body, {
            withCredentials: true,
        });
        console.log(response);
        return response;
    } catch (err) {
        console.error(err.message);
    }
}
async function updateUser() {
    //put
}

export {
    signUpUser,
    signInUser,
    signOutUser,
    accessToken,
    refreshToken,
    updateUser,
};
