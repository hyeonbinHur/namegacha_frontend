import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';
import { useQuery } from 'react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
// import { useEffect, useState } from 'react';

export default function Header() {
    const { user } = useAuthContext();
    const {
        data: projects,
        // error,
        // isLoading,
    } = useQuery('getCertainProjects', () => getCertainProjects(user.uuid), {
        enabled: !!user,
    });

    return (
        <div className="main">
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} className="logo" />
                </div>
                <div onClick={() => console.log(user)}>show user</div>
            </div>
            <div>
                {projects && projects.data.length > 0 ? (
                    <div className="project">
                        <ul>
                            {projects.map((project) => (
                                <li key={project.projectId}>
                                    <ProjectCard project={project} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div> </div>
                )}
            </div>
        </div>
    );
}
