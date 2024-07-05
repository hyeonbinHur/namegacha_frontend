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
        throw err;
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

        try {
            const uuid = response.data.uuid;
            const userResponse = await getUserData(uuid);
            console.log(userResponse);
            const userObject = {
                uuid: uuid,
                userId: userResponse.data.userId,
                createdAt: userResponse.data.createdAt,
            };
            console.log(userObject);
            return userObject;
        } catch (err) {
            console.error(
                'Get user data error in sign in ',
                err.response || err.message
            );
        }
    } catch (err) {
        console.error('SignIn Error: ', err.response || err.message);
        throw err;
    }
}
async function signOutUser() {
    //post
    try {
        console.log('Start sign out');
        const body = {
            content: 'sign out',
        };
        const response = await axios.post(authEndpoint, body, {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        console.error(err.message);
        throw err;
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
        throw err;
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
        return response;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function updateUser() {
    //put
}

// get user data -> 필요없고

// check user login status

/*
 *  access token check;
 *  refresh token check;
 *  확인 되면 get user data;
 */

async function checkTokens() {
    try {
        const accStatus = await accessToken();
        if (accStatus.status === 200) {
            return accStatus;
        } else {
            const refStatus = await refreshToken();

            if (refStatus.status === 200) {
                return refStatus;
            } else {
                return false;
            }
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function getUserData(uuid) {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth?uuid=${uuid}`;
        const response = await axios.get(endPoint);
        return response;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export {
    signUpUser,
    signInUser,
    signOutUser,
    accessToken,
    refreshToken,
    updateUser,
    checkTokens,
    getUserData,
};
