import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import * as projectAPI from '../../utils/api/aws/projectRoutes.js';
import { useState } from 'react';

export default function Header() {
    const [isAdd, setIsAdd] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuthContext();
    const navigator = useNavigate();
    const {
        data: projects,
        // error,
        isLoading,
    } = useQuery('getCertainProjects', () => getCertainProjects(user.uuid), {
        enabled: !!user,
    });
    const moveToSignInPage = () => {
        navigator('/auth');
    };
    const queryClient = useQueryClient();
    const { mutate: addProject } = useMutation({
        mutationFn: ({ projectName, userId }) => {
            return projectAPI.createProject(projectName, userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const startAddProject = (e) => {
        e.preventDefault();
        if (newProjectName.length == 0) return;
        addProject({
            projectName: newProjectName,
            userId: user.uuid,
        });
        setIsAdd(false);
    };

    return (
        <div className="main">
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} className="logo" />
                </div>
                <div onClick={() => console.log(user.uuid)}>show user</div>
                <button
                    className="show-projects-btn"
                    onClick={() => console.log(projects)}
                >
                    console button
                </button>
            </div>
            <div>{isLoading && <div> is loading</div>}</div>
            <div>
                {user && (
                    <div>
                        {user.userId}
                        <div>
                            <i
                                className="icon-basic-elaboration-folder-plus"
                                style={{ fontSize: '2rem' }}
                                onClick={() => setIsAdd((prev) => !prev)}
                            ></i>
                        </div>
                    </div>
                )}
            </div>

            <div>
                {user ? (
                    projects && projects.data.length > 0 ? (
                        <div className="project">
                            {isAdd && (
                                <div>
                                    <input
                                        value={newProjectName}
                                        onChange={(e) =>
                                            setNewProjectName(e.target.value)
                                        }
                                    />
                                    <button onClick={(e) => startAddProject(e)}>
                                        add project
                                    </button>
                                </div>
                            )}
                            <ul>
                                {projects.data.map((project) => (
                                    <li key={project.projectId}>
                                        <ProjectCard project={project} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div> No Projects </div>
                    )
                ) : (
                    <button onClick={() => moveToSignInPage()}>
                        go to sign in
                    </button>
                )}
            </div>
        </div>
    );
}
