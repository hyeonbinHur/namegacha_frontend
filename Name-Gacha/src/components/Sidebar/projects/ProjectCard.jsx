/* eslint-disable react/prop-types */
import { SlOptions } from 'react-icons/sl';
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import PageCard from '../pages/PageCard.jsx';
import './projectCard.css';
import { useState } from 'react';
import { useMutation } from 'react-query';
// import { useQuery } from 'react-query';
import * as PageAPI from '../../../utils/api/aws/pageRoutes.js';

export default function ProjectCard({ project }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pages, setPages] = useState([]);

    // const {data:pages} = useQuery('get pages' , () =>)

    // useEffect(() => {
    //     if (project.pages) {
    //         setPages(project.pages);
    //     }
    // }, [project]);

    const { mutate: addPage } = useMutation({
        mutationFn: ({ pageName, projectId }) => {
            return PageAPI.createPage(pageName, projectId);
        },
    });
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

                <i
                    className="icon-basic-elaboration-document-plus pageAddCard"
                    onClick={() =>
                        addPage({
                            projectId: project.projectId,
                            pageName: 'add page test',
                        })
                    }
                ></i>
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
