/* eslint-disable react/prop-types */
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import PageCard from '../pages/PageCard.jsx';
// import './projectCard.css';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as PageAPI from '../../../utils/api/aws/pageRoutes.js';
import * as projectAPI from '../../../utils/api/aws/projectRoutes.js';
import { useSelector, useDispatch } from 'react-redux';
import {
    openContextMenu,
    clearContextMenu,
} from '../../../store/contextMenuSlice.js';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../../components/ContextMenu/ContextMenu.jsx';

export default function ProjectCard({ project }) {
    /** States */
    const [isOpen, setIsOpen] = useState(false);
    const [projectName, setProjectName] = useState(project.projectName || '');
    const [newPageName, setNewPageName] = useState('');
    /**Slice variables*/
    const sliceContextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );
    const sliceIsContextOpen = useSelector(
        (state) => state.currentContextMenu.isOpen
    );
    const sliceIsAdd = useSelector((state) => state.currentContextMenu.isAdd);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);

    /** Variables & flags */
    const componentIsThis = contextUtil.isContextVerity(
        sliceContextTarget,
        project.projectName,
        project.projectId
    );
    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsContextOpen
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );
    const componentIsAdd = contextUtil.checkIsAdd(componentIsThis, sliceIsAdd);

    /** Functions */
    /** HTTP request */
    const { mutate: addPage } = useMutation({
        mutationFn: ({ pageName, pageExp, projectId }) => {
            return PageAPI.createPage(projectId, pageName, pageExp);
        },
    });

    const { mutate: updateProject } = useMutation({
        mutationFn: ({ newProjectName, projectId }) => {
            return projectAPI.updateProject(projectId, newProjectName);
        },
    });

    /**Slice Functions */
    const dispatch = useDispatch();

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                name: project.projectName,
                id: project.projectId,
            })
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(clearContextMenu());
            updateProject({
                newProjectName: projectName,
                projectId: project.projectId,
            });
            console.log(projectName);
        } else if (e.key === 'Escape') {
            dispatch(clearContextMenu());
            setProjectName(project.projectName);
        }
    };

    const handleKeyDownAddPage = (e) => {
        if (e.key === 'Enter') {
            addPage({
                pageName: newPageName,
                pageExp: '',
                projectId: project.projectId,
            });
        } else if (e.key === 'Escape') {
            dispatch(clearContextMenu());
            setNewPageName('');
        }
    };

    return (
        <div className="sd-item">
            <section>
                <div
                    className="sd-item--main"
                    onContextMenu={(e) => handleContextMenu(e)}
                >
                    {isOpen ? (
                        <div
                            className="sd-item--main__icons"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <BsCaretUp className="sd-item--main__icons__arrow" />
                            <AiFillFolderOpen className="sd-item--main__icons__folder" />
                        </div>
                    ) : (
                        <div
                            className="sd-item--main__icons"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <BsCaretDown className="sd-item--main__icons__arrow" />
                            <AiFillFolder className="sd-item--main__icons__folder" />
                        </div>
                    )}

                    {componentIsEdit ? (
                        <input
                            value={projectName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setProjectName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    ) : (
                        <div className="sd-item--main__name">
                            {project.projectName}
                        </div>
                    )}

                    <i
                        className="sd-item--main__plus-icon icon-basic-elaboration-browser-plus "
                        onClick={() =>
                            addPage({
                                projectId: project.projectId,
                                pageExp: '',
                                pageName: 'add page test',
                            })
                        }
                    ></i>
                </div>
            </section>

            <section className="sd-item--sub">
                {isOpen == true && (
                    <ul className="sd-item--sub__pg-ul">
                        {componentIsAdd && (
                            <div>
                                <input
                                    value={newPageName}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        setNewPageName(e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDownAddPage(e)}
                                />
                            </div>
                        )}
                        {project.pages.map((page) => (
                            <li key={page.pageId} className="sd-item--open">
                                <PageCard page={page} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'project'} item={project} />
                )}
            </section>
        </div>
    );
}
