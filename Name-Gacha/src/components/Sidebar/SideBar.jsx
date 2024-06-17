import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import * as projectAPI from '../../utils/api/aws/projectRoutes.js';

export default function Header() {
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
                                onClick={() =>
                                    addProject({
                                        projectName: 'front end project test',
                                        userId: user.uuid,
                                    })
                                }
                            ></i>
                        </div>
                    </div>
                )}
            </div>

            <div>
                {user ? (
                    projects && projects.data.length > 0 ? (
                        <div className="project">
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
