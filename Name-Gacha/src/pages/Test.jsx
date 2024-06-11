import { useEffect, useState } from 'react';
import * as projectAPI from '../utils/api/aws/projectRoutes';
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
            ---------------get all pages-----------------------
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
                -------------------get one page ---------------
                {item && (
                    <div>
                        <div>project Id : {item.projectId}</div>
                        <div>project Name : {item.projectName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create page---------------------
                <form onSubmit={createProject}>
                    <div>
                        <label>new project name</label>
                        <input type="text" name="name" />
                    </div>
                    <button type="submit"> create project </button>
                </form>
            </div>
            <div>--------------------update page---------------------</div>
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
            <div>--------------------delete page---------------------</div>
            <button onClick={() => deleteProject(3)}>delete project</button>
        </div>
    );
}

function VariableTestCard() {
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
            ---------------get all pages-----------------------
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
                -------------------get one page ---------------
                {item && (
                    <div>
                        <div>project Id : {item.projectId}</div>
                        <div>project Name : {item.projectName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create page---------------------
                <form onSubmit={createProject}>
                    <div>
                        <label>new project name</label>
                        <input type="text" name="name" />
                    </div>
                    <button type="submit"> create project </button>
                </form>
            </div>
            <div>--------------------update page---------------------</div>
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
            <div>--------------------delete page---------------------</div>
            <button onClick={() => deleteProject(3)}>delete project</button>
        </div>
    );
}

function FunctionTestCard() {
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
            ---------------get all pages-----------------------
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
                -------------------get one page ---------------
                {item && (
                    <div>
                        <div>project Id : {item.projectId}</div>
                        <div>project Name : {item.projectName} </div>
                    </div>
                )}
            </div>
            <div>
                --------------------create page---------------------
                <form onSubmit={createProject}>
                    <div>
                        <label>new project name</label>
                        <input type="text" name="name" />
                    </div>
                    <button type="submit"> create project </button>
                </form>
            </div>
            <div>--------------------update page---------------------</div>
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
            <div>--------------------delete page---------------------</div>
            <button onClick={() => deleteProject(3)}>delete project</button>
        </div>
    );
}
