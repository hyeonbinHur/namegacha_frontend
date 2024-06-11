import { useEffect, useState } from 'react';
import * as projectAPI from '../utils/api/aws/projectRoutes';
import * as pageAPI from '../utils/api/aws/pageRoutes';
import * as variableAPI from '../utils/api/aws/variableRoutes';
import * as functionAPI from '../utils/api/aws/functionRoutes';

import { useQuery } from 'react-query';

export default function Test() {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <ProjectTestCard />
            </div>

            <div>
                <PageTestCard />
            </div>
            <div>
                <VariableTestCard />
            </div>
            <div>
                <FunctionTestCard />
            </div>
        </div>
    );
}

function ProjectTestCard() {
    const [items, setItems] = useState(null);
    const [item, setItem] = useState(null);
    const { data } = useQuery('getProjects', projectAPI.getProjects);
    const { data: data1 } = useQuery('getProject', () =>
        projectAPI.getProject(4)
    );

    useEffect(() => {
        if (data) {
            setItems(data);
        }
        if (data1) {
            setItem(data1);
        }
    }, [data, data1]); // 의존성 배열에 data1 추가

    const createProject = async (e) => {
        e.preventDefault();
        const form = e.target;
        const projectName = form.name.value;
        const response = await projectAPI.createProject(projectName);
        console.log(response);
    };

    const updateProject = async (e) => {
        e.preventDefault();
        const form = e.target;
        const projectName = form.name.value;
        const projectId = 4;
        const response = await projectAPI.updateProject(projectId, projectName);
        console.log(response);
    };

    const deleteProject = async (projectId) => {
        const response = await projectAPI.deleteProject(projectId);
        console.log(response);
    };

    return (
        <div>
            ---------------get all projects-----------------------
            <div>
                {items && (
                    <div>
                        {items.map((i) => (
                            <li key={i.projectId}>
                                <div>project Id : {i.projectId} </div>
                                <div>project name : {i.projectName}</div>
                            </li>
                        ))}
                    </div>
                )}
            </div>
            <div>
                -------------------get one project ---------------
                {item && (
                    <div>
                        <div>project Id : {item.projectId}</div>
                        <div>project Name : {item.projectName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create project---------------------
                <form onSubmit={createProject}>
                    <div>
                        <label>new project name</label>
                        <input type="text" name="name" />
                    </div>
                    <button type="submit"> create project </button>
                </form>
            </div>
            <div>--------------------update proejct---------------------</div>
            {item && (
                <div>
                    <div>project Id : {item.projectId}</div>
                    <div>project Name : {item.projectName} </div>
                    <form onSubmit={updateProject}>
                        <div>
                            <label>new project name</label>
                            <input type="text" name="name" />
                        </div>
                        <button type="submit"> update project </button>
                    </form>
                </div>
            )}
            <div>--------------------delete project---------------------</div>
            <button onClick={() => deleteProject(3)}>delete project</button>
        </div>
    );
}

function PageTestCard() {
    const [items, setItems] = useState(null);
    const [item, setItem] = useState(null);
    const { data } = useQuery('getPages', pageAPI.getPages);
    const { data: data1 } = useQuery('getPage', () => pageAPI.getPage(4));

    useEffect(() => {
        if (data) {
            setItems(data);
        }
        if (data1) {
            setItem(data1);
        }
    }, [data, data1]); // 의존성 배열에 data1 추가

    const createPage = async (e) => {
        e.preventDefault();
        const form = e.target;
        const pageName = form.name.value;
        const projectId = form.id.value;
        const response = await pageAPI.createPage(pageName, projectId);
        console.log(response);
    };

    const updatePage = async (e) => {
        e.preventDefault();
        const form = e.target;
        const pageName = form.name.value;
        const pageId = 4;
        const response = await pageAPI.updatePage(pageId, pageName);
        console.log(response);
    };

    const deletePage = async (pageId) => {
        const response = await pageAPI.deletePage(pageId);
        console.log(response);
    };

    return (
        <div>
            ---------------get all pages-----------------------
            <div>
                {items && (
                    <div>
                        {items.map((i) => (
                            <li key={i.pageId}>
                                <div>project Id : {i.pageId} </div>
                                <div>project name : {i.pageName}</div>
                            </li>
                        ))}
                    </div>
                )}
            </div>
            <div>
                -------------------get one page ---------------
                {item && (
                    <div>
                        <div>page Id : {item.pageId}</div>
                        <div>page Name : {item.pageName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create page---------------------
                <form onSubmit={createPage}>
                    <div>
                        <label>new page name</label>
                        <input type="text" name="name" />
                        <label> project id</label>
                        <input type="text" name="id" />
                    </div>
                    <button type="submit"> create page </button>
                </form>
            </div>
            <div>--------------------update page---------------------</div>
            {item && (
                <div>
                    <div>page Id : {item.pageId}</div>
                    <div>page Name : {item.pageName} </div>
                    <form onSubmit={updatePage}>
                        <div>
                            <label>new page name</label>
                            <input type="text" name="name" />
                        </div>
                        <button type="submit"> update page </button>
                    </form>
                </div>
            )}
            <div>--------------------delete page---------------------</div>
            <button onClick={() => deletePage(3)}>delete page</button>
        </div>
    );
}

function VariableTestCard() {
    const [items, setItems] = useState(null);
    const [item, setItem] = useState(null);
    const { data } = useQuery('getVariables', variableAPI.getVariables);
    const { data: data1 } = useQuery('getVariable', () =>
        variableAPI.getVariable(4)
    );

    useEffect(() => {
        if (data) {
            setItems(data);
        }
        if (data1) {
            setItem(data1);
        }
    }, [data, data1]); // 의존성 배열에 data1 추가

    const createVariable = async (e) => {
        e.preventDefault();
        const form = e.target;
        const variableName = form.name.value;
        const pageId = form.id.value;
        const response = await variableAPI.createVariable(variableName, pageId);
        console.log(response);
    };

    const updateVariable = async (e) => {
        e.preventDefault();
        const form = e.target;
        const variableName = form.name.value;
        const variableId = 4;
        const response = await variableAPI.updateVariable(
            variableId,
            variableName
        );
        console.log(response);
    };

    const deleteVariable = async (variableId) => {
        const response = await variableAPI.deleteVariable(variableId);
        console.log(response);
    };

    return (
        <div>
            ---------------get all variables-----------------------
            <div>
                {items && (
                    <div>
                        {items.map((i) => (
                            <li key={i.variableId}>
                                <div>variable Id : {i.variableId} </div>
                                <div>variable name : {i.variableName}</div>
                            </li>
                        ))}
                    </div>
                )}
            </div>
            <div>
                -------------------get one variable ---------------
                {item && (
                    <div>
                        <div>variable Id : {item.variableId}</div>
                        <div>variable Name : {item.variableName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create variable---------------------
                <form onSubmit={createVariable}>
                    <div>
                        <label>new variable name</label>
                        <input type="text" name="name" />
                        <label>page id</label>
                        <input type="text" name="id" />
                    </div>
                    <button type="submit"> create variable </button>
                </form>
            </div>
            <div>--------------------update variable---------------------</div>
            {item && (
                <div>
                    <div>variable Id : {item.variableId}</div>
                    <div>variable Name : {item.variableName} </div>
                    <form onSubmit={updateVariable}>
                        <div>
                            <label>new variable name</label>
                            <input type="text" name="name" />
                        </div>
                        <button type="submit"> update variable </button>
                    </form>
                </div>
            )}
            <div>--------------------delete page---------------------</div>
            <button onClick={() => deleteVariable(3)}>delete project</button>
        </div>
    );
}

function FunctionTestCard() {
    const [items, setItems] = useState(null);
    const [item, setItem] = useState(null);
    const { data } = useQuery('getFunctions', functionAPI.getFunctions);
    const { data: data1 } = useQuery('getFunction', () =>
        functionAPI.getFunction(4)
    );

    useEffect(() => {
        if (data) {
            setItems(data);
        }
        if (data1) {
            setItem(data1);
        }
    }, [data, data1]); // 의존성 배열에 data1 추가

    const createFunction = async (e) => {
        e.preventDefault();
        const form = e.target;
        const functionName = form.name.value;
        const pageId = form.id.value;
        const response = await functionAPI.createFunction(functionName, pageId);
        console.log(response);
    };

    const updateFunction = async (e) => {
        e.preventDefault();
        const form = e.target;
        const functionName = form.name.value;
        const functionId = 4;
        const response = await functionAPI.updateFunction(
            functionId,
            functionName
        );
        console.log(response);
    };

    const deleteFunction = async (functionId) => {
        const response = await functionAPI.deleteFunction(functionId);
        console.log(response);
    };

    return (
        <div>
            ---------------get all functions-----------------------
            <div>
                {items && (
                    <div>
                        {items.map((i) => (
                            <li key={i.functionId}>
                                <div>function Id : {i.functionId} </div>
                                <div>function name : {i.functionName}</div>
                            </li>
                        ))}
                    </div>
                )}
            </div>
            <div>
                -------------------get one function ---------------
                {item && (
                    <div>
                        <div>function Id : {item.functionId}</div>
                        <div>function Name : {item.functionName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create function---------------------
                <form onSubmit={createFunction}>
                    <div>
                        <label>new function name</label>
                        <input type="text" name="name" />
                        <label>page id</label>
                        <input type="text" name="id" />
                    </div>
                    <button type="submit"> create function </button>
                </form>
            </div>
            <div>--------------------update function---------------------</div>
            {item && (
                <div>
                    <div>function Id : {item.functionId}</div>
                    <div>function Name : {item.functionName} </div>
                    <form onSubmit={updateFunction}>
                        <div>
                            <label>new function name</label>
                            <input type="text" name="name" />
                        </div>
                        <button type="submit"> update project </button>
                    </form>
                </div>
            )}
            <div>--------------------delete function---------------------</div>
            <button onClick={() => deleteFunction(3)}>delete function</button>
        </div>
    );
}
