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
    clearContextMenu,
} from '../../../store/contextMenuSlice.js';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../../components/ContextMenu/ContextMenu.jsx';

export default function ProjectCard({ project }) {
    /** States */
    const [isOpen, setIsOpen] = useState(false);
    const [projectName, setProjectName] = useState(project.projectName || '');

    /**Redux dispatch */
    const dispatch = useDispatch();

    /**Redux Selector*/
    const contextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );
    const isContextOpen_S = useSelector(
        (state) => state.currentContextMenu.isOpen
    );

    /** HTTP request */
    const { mutate: addPage } = useMutation({
        mutationFn: ({ pageName, projectId }) => {
            return PageAPI.createPage(pageName, projectId);
        },
    });

    /** Variables & flags */
    /**isRename is for redux */
    const isRename = useSelector((state) => state.currentContextMenu.isEdit);

    const isContext = contextUtil.isContextVerity(
        contextTarget,
        project.projectName,
        project.projectId
    );
    const isContextOpen_C = contextUtil.isContextOpen(
        isContext,
        isContextOpen_S
    );
    /**isEdit is for component */
    const isEdit = contextUtil.checkIsRename(isContext, isRename);

    /** Functions */
    const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log(projectName);
        } else if (e.key === 'Escape') {
            dispatch(clearContextMenu());
            setProjectName(project.projectName);
        }
    };

    const openFolder = () => {
        if (isEdit) {
            return;
        } else {
            setIsOpen((prev) => !prev);
        }
    };

    return (
        <div
            className="project-container"
            onClick={(e) => closeMenu(e)}
            onContextMenu={(e) => closeMenu(e)}
        >
            <div className="name name-main project-name ">
                <div
                    className="name-sub"
                    onClick={() => openFolder()}
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
                    {isEdit ? (
                        <input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    ) : (
                        <div> {project.projectName} </div>
                    )}
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

            <section>
                {isContextOpen_C && (
                    <ContextMenu
                        type={'project'}
                        name={project.projectName}
                        id={project.projectId}
                    />
                )}
            </section>
        </div>
    );
}
