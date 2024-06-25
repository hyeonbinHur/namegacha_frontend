/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes';
import { createVariable } from '../../utils/api/aws/variableRoutes';
import { createFunction } from '../../utils/api/aws/functionRoutes';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeIedntifierModal } from '../../store/identifiyerModal';

const IdentifierModal = forwardRef(function IdentifierModal(
    { user, type, newIdentifier },
    ref
) {
    const dispatch = useDispatch();
    const modal = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);

    const findItem = (type, id) => {
        if (type === 'project') {
            const project = projects.find(
                (project) => project.projectId === id
            );
            if (project) {
                setSelectedProject(project);
            }
        } else if (type === 'page' && selectedProject) {
            const page = selectedProject.pages.find(
                (page) => page.pageId === id
            );
            if (page) {
                setSelectedPage(page);
            }
        }
    };

    const { data: projects } = useQuery({
        queryKey: ['getCertainProjects', user?.uuid],
        queryFn: () => getCertainProjects(user.uuid),
        enabled: !!user,
    });
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ pageId, variableName, variableExp }) => {
            return createVariable(pageId, variableName, variableExp);
        },
    });
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ pageId, functionName, functionExp }) => {
            return createFunction(pageId, functionName, functionExp);
        },
    });
    const startAddIdentifier = () => {
        if (type === 'variable') {
            mutateAddVariable({
                pageId: selectedPage.pageId,
                variableName: newIdentifier.name,
                variableExp: newIdentifier.exp,
            });
        } else {
            mutateAddFunction({
                pageId: selectedPage.pageId,
                functionName: newIdentifier.name,
                functionExp: newIdentifier.exp,
            });
        }
    };
    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modal.current.showModal();
            },
            close: () => {
                dispatch(closeIedntifierModal());
                modal.current.close();
            },
        };
    });
    return createPortal(
        <div>
            <dialog ref={modal}>
                <button onClick={() => modal.current.close()}> close </button>
                {user && projects && projects.length > 0 && (
                    <div>
                        <div className="project-contaier">
                            <ul>
                                {/* project card */}
                                {projects.map((project) => (
                                    <li key={`project-${project.projectId}`}>
                                        <ModalCard
                                            onClick={() =>
                                                findItem(
                                                    'project',
                                                    project.projectId
                                                )
                                            }
                                            name={project.projectName}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="page-container">
                            {selectedProject && (
                                <ul>
                                    {/* page card */}
                                    {selectedProject.pages.map((page) => (
                                        <li key={`page-${page.pageId}`}>
                                            <ModalCard
                                                onClick={() =>
                                                    findItem(
                                                        'project',
                                                        page.pageId
                                                    )
                                                }
                                                name={page.pageName}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {selectedPage && (
                            <div className="identifier-container">
                                {type === 'variable' ? (
                                    <div>
                                        {/* variable card */}
                                        {selectedPage.variables.map(
                                            (variable) => (
                                                <li
                                                    key={`variable-${variable.variableId}`}
                                                >
                                                    <ModalCard
                                                        name={
                                                            variable.variableName
                                                        }
                                                        id={variable.variableId}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {/* function card */}
                                        {selectedPage.functions.map((fn) => (
                                            <li
                                                key={`function-${fn.functionId}`}
                                            >
                                                <ModalCard
                                                    name={fn.functionName}
                                                    id={fn.functionId}
                                                />
                                            </li>
                                        ))}
                                    </div>
                                )}
                                <div className="newitem-container">
                                    <div>{newIdentifier.name}</div>
                                    <div>{newIdentifier.exp}</div>
                                </div>
                            </div>
                        )}
                        <button onClick={() => startAddIdentifier()}>
                            save
                        </button>
                        <button> cancel </button>
                    </div>
                )}
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});
const ModalCard = ({ name }) => {
    return <div>{name}</div>;
};
export default IdentifierModal;
