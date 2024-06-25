import axios from 'axios';

async function getProject(projectId) {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project?projectId=${projectId}`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function getCertainProjects(uuid) {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project/projects?content=certain&uuid=${uuid}`;
        const response = await axios.get(endPoint);
        return response;
    } catch (err) {
        return err;
    }
}

async function getProjects() {
    //get
    try {
        const endPoint =
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project/projects?content=all';
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}
async function createProject(projectName, uuid) {
    //post
    try {
        console.log('project name :' + projectName);
        console.log('uuid :' + uuid);
        const endPoint =
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project';
        const body = {
            projectName: projectName,
            uuid: uuid,
        };
        const response = await axios.post(endPoint, body);
        console.log('Create project done');
        return response;
    } catch (err) {
        console.error(err.message);
    }
}
async function updateProject(projectId, projectName) {
    const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project?projectId=${projectId}`;
    const body = {
        projectId: projectId,
        projectName: projectName,
    };
    const response = await axios.put(endPoint, body);
    return response; // API 응답 데이터를 반환
}
async function deleteProject(projectId) {
    //delete
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project?projectId=${projectId}`;
        const response = await axios.delete(endPoint);
        return response;
    } catch (err) {
        console.error(err.message);
    }
}

export {
    getProject,
    getCertainProjects,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
