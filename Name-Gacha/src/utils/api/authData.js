import axios from 'axios';

async function createUser(userId, userPassword) {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/sign-up';
        const body = {
            userId: userId,
            userPassword: userPassword,
        };
        return await axios.post(endPoint, body);
    } catch (err) {
        console.error(err);
    }
}

async function signInUser(userId, userPassword) {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/sign-in';
        const body = {
            userId: userId,
            userPassword: userPassword,
        };
        return await axios.post(endPoint, body, { withCredentials: true });
    } catch (err) {
        console.error(err);
    }
}
async function checkAccessToken() {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/accesstoken';
        const response = await axios.post(
            endPoint,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        return err.response.status;
    }
}
async function checkRefreshToken() {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/refreshtoken';
        const response = await axios.post(
            endPoint,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        return err.response.status;
    }
}
async function checkLoginStatus() {
    try {
        return checkAccessToken();
    } catch (err1) {
        return checkRefreshToken();
    }
}
export {
    createUser,
    signInUser,
    checkAccessToken,
    checkRefreshToken,
    checkLoginStatus,
};

//http://localhost:8080/namegacha/api/sign-up
//http://localhost:8080/namegacha/api/sign-in
