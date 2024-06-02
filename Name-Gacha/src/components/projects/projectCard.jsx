import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import PageCard from '../pages/PageCard.jsx';
import './projectCard.css';
import { useState } from 'react';

export default function ProjectCard() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="project-container">
            <span
                className="name projet-name"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <AiFillFolderOpen className="folder" />
                <AiFillFolder className="folder" />
                <BsCaretDown className="arrow" />
                <BsCaretUp className="arrow" />
                Project Name
            </span>
            {isOpen == true && (
                <div>
                    <PageCard />
                </div>
            )}
        </div>
    );
}
