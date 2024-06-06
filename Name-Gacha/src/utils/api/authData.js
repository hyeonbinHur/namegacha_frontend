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
        return await axios.post(endPoint, {}, { withCredentials: true });
    } catch (err) {
        console.error(err);
    }
}

export { createUser, signInUser, checkAccessToken };

//http://localhost:8080/namegacha/api/sign-up
//http://localhost:8080/namegacha/api/sign-in
