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
import { useSelector, useDispatch } from 'react-redux';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice.js';

export default function ProjectCard({ project }) {
    const [isOpen, setIsOpen] = useState(false);

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

    const dispatch = useDispatch();
    const isContextMenu = useSelector(
        (state) => state.currentContextMenu.isOpen
    );
    const contextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );

    const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation(); // 이벤트 전파 중단
        dispatch(
            openContextMenu({
                name: project.projectName,
                id: project.projectId,
            })
        );
    };
    const closeMenu = (e) => {
        e.preventDefault();
        dispatch(closeContextMenu());
    };

    return (
        <div
            className="project-container"
            onClick={(e) => closeMenu(e)}
            onContextMenu={(e) => closeMenu(e)}
        >
            <button onClick={() => console.log(isContextMenu)}>
                is context menu ?
            </button>
            <button onClick={() => console.log(contextTarget)}>
                context target
            </button>
            <button onClick={() => console.log(project)}>show pages</button>
            <div className="name name-main project-name ">
                <div
                    className="name-sub"
                    onClick={() => setIsOpen((prev) => !prev)}
                    onContextMenu={(e) => openMenu(e)}
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
                    className="icon-basic-elaboration-document-plus"
                    onClick={() =>
                        addPage({
                            projectId: project.projectId,
                            pageName: 'add page test',
                        })
                    }
                ></i>
                <div className="option">
                    <SlOptions />
                    {isContextMenu &&
                        contextTarget.name == project.projectName &&
                        contextTarget.id == project.projectId && (
                            <div> right click open </div>
                        )}
                </div>
            </div>
            {isOpen == true && (
                <ul>
                    {project.pages.map((page) => (
                        <li key={page.pageId}>
                            <PageCard page={page} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
