import axios from 'axios';

async function getPage(pageId) {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/page?pageId=${pageId}`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function getPages() {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/page/pages`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function createPage(projectId, pageName, pageExp) {
    //post
    try {
        console.log('create page');
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/page`;
        const body = {
            pageName: pageName,
            projectId: projectId,
            pageExp: pageExp,
        };
        const response = await axios.post(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function updatePage(pageId, pageName, pageExp) {
    //put
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/page?pageId=${pageId}`;
        const body = {
            pageName: pageName,
            pageExp: pageExp,
        };
        const response = await axios.put(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

async function deletePage(pageId) {
    //delete
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/page?pageId=${pageId}`;

        const response = await axios.delete(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
}

export { getPage, getPages, createPage, updatePage, deletePage };
