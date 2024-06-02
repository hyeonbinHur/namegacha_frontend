import { SlOptions } from 'react-icons/sl';
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
            <div className="name name-main project-name ">
                <div
                    className="name-sub"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? (
                        <div>
                            <BsCaretUp className="arrow" />
                            <AiFillFolderOpen className="folder" />
                        </div>
                    ) : (
                        <div>
                            <BsCaretDown className="arrow" />
                            <AiFillFolder className="folder" />
                        </div>
                    )}
                    Project Name
                </div>
                <div className="option">
                    <SlOptions />
                </div>
            </div>
            {isOpen == true && (
                <div>
                    <PageCard />
                </div>
            )}
        </div>
    );
}
