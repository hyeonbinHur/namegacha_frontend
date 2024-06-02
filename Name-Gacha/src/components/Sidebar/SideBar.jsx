import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import './sidebar.css';

export default function Header() {
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
            </div>
        </div>
    );
}
