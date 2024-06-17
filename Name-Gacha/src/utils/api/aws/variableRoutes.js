import axios from 'axios';

async function getVariable(variableId) {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/variable?variableId=${variableId}`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function getVariables() {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/variable/variables`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function createVariable(variableName, pageId) {
    //post
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/variable`;
        const body = {
            variableName: variableName,
            pageId: pageId,
        };
        const response = await axios.post(endPoint, body);
        console.log('create variable done');
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function updateVariable(variableId, variableName) {
    //put
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/variable?variableId=${variableId}`;
        const body = {
            variableName: variableName,
        };
        const response = await axios.put(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function deleteVariable(variableId) {
    //delete
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/variable?variableId=${variableId}`;

        const response = await axios.delete(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

export {
    getVariable,
    getVariables,
    createVariable,
    updateVariable,
    deleteVariable,
};
