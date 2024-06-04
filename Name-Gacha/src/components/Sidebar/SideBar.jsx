import { useState } from 'react';
import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';
import { useQuery } from 'react-query';

export default function Header() {
    const [projects, setProjects] = useState([]);

    // useQuery('postAllProjects', getAllProjects, {
    //     onSuccess: (data) => setProjects(data),
    //     onError: (error) => {
    //         console.error('에러: ', error);
    //         setProjects([]);
    //     },
    // });

    return (
        <div className="main">
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} className="logo" />
                </div>
            </div>

            <div>
                <div className="project">
                    <ProjectCard />
                </div>
                <button onClick={() => projects}>Show projects</button>
            </div>
        </div>
    );
}
