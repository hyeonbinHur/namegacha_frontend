import { useEffect, useState } from 'react';
import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';
import { useQuery } from 'react-query';
import { getALLInfomation } from '../../utils/api/readData.js';

export default function Header() {
    const [projects, setProjects] = useState([]);
    const { data } = useQuery('postAllProjects', getALLInfomation);
    useEffect(() => {
        if (data) {
            setProjects(data);
        }
    }, [data]);

    return (
        <div className="main">
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} className="logo" />
                </div>
            </div>
            <div>
                <div className="project">
                    <ul>
                        {projects.map((project) => (
                            <li key={project.projectId}>
                                <ProjectCard project={project} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
