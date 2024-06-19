import axios from 'axios';

async function getFunction(functionId) {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?functionId=${functionId}`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function getFunctions() {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function/functions`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function createFunction(functionName, pageId) {
    //post
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function`;
        const body = {
            functionName: functionName,
            pageId: pageId,
        };
        const response = await axios.post(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function updateFunction(functionId, functionName) {
    //put
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?functionId=${functionId}`;
        const body = {
            functionName: functionName,
        };
        const response = await axios.put(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function deleteFunction(functionId) {
    //delete
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?content=certain&functionId=${functionId}`;
        const response = await axios.delete(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function deleteFunctionsInPage(pageId) {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?content=inpage&pageId=${pageId}`;
        const response = await axios.delete(endPoint);
        return response;
    } catch (err) {
        console.error(err.message);
    }
}

export {
    getFunction,
    getFunctions,
    createFunction,
    updateFunction,
    deleteFunction,
    deleteFunctionsInPage,
};
