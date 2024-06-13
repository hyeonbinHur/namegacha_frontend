/* eslint-disable react/prop-types */
import { SlOptions } from 'react-icons/sl';
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import PageCard from '../pages/PageCard.jsx';
import './projectCard.css';
import { useEffect, useState } from 'react';
export default function ProjectCard({ project }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pages, setPages] = useState([]);
    // useEffect(() => {
    //     if (project.pages) {
    //         setPages(project.pages);
    //     }
    // }, [project]);
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
                    {project.projectName}
                </div>
                <div className="option">
                    <SlOptions />
                </div>
            </div>
            {isOpen == true && (
                <ul>
                    {pages.map((page) => (
                        <li key={page.pageId}>
                            <PageCard page={page} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
