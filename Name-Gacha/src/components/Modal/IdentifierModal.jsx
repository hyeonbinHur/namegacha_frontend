/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes';
import { createVariable } from '../../utils/api/aws/variableRoutes';
import { createFunction } from '../../utils/api/aws/functionRoutes';
import { createPortal } from 'react-dom';

const IdentifierModal = forwardRef(function IdentifierModal(
    { user, type, newIdentifier },
    ref
) {
    const modal = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const findItem = (type, id) => {
        if (type === 'project') {
            const index = projects.find((project) => project.projectId === id);
            if (index !== -1) {
                setSelectedProject(projects[index]);
            }
        } else if (type === 'page') {
            const index = selectedProject.pages.find(
                (page) => page.pageId === id
            );
            if (index !== -1) {
                setSelectedPage(selectedProject.pages[index]);
            }
        }
    };
    const { data: projects } = useQuery({
        queryKey: ['getCertainProjects', user?.uuid], // 쿼리 키에 user의 uuid를 포함시켜 각 uuid에 대해 별도의 캐시를 관리
        queryFn: () => getCertainProjects(user.uuid),
        enabled: !!user, // user가 존재할 때만 쿼리 실행
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
                modal.current.close();
            },
        };
    });
    return createPortal(
        <div>
            <dialog ref={modal}>
                <button> close </button>
                <div className="project-contaier">
                    <ul>
                        {/* project card */}
                        {projects.map((project) => (
                            <li key={project}>
                                <ModalCard
                                    onClick={() =>
                                        findItem('project', project.projectId)
                                    }
                                    name={project.projectName}
                                    id={project.ProjectId}
                                    type={'project'}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="page-container">
                    <ul>
                        {/* page card */}
                        {selectedProject.pages.map((page) => (
                            <li key={page}>
                                <ModalCard
                                    onClick={() =>
                                        findItem('project', page.pageId)
                                    }
                                    name={page.pageName}
                                    id={page.pageId}
                                    type={'page'}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="identifier-container">
                    {type === 'variable' ? (
                        <div>
                            {/* variable card */}
                            {selectedPage.variables.map((variable) => (
                                <li key={variable}>
                                    <ModalCard
                                        name={variable.variableName}
                                        id={variable.variableId}
                                    />
                                </li>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {/* function card */}
                            {selectedPage.functions.map((fn) => (
                                <li key={fn}>
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
                <button onClick={() => startAddIdentifier()}> save </button>
                <button> cancel </button>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});
const ModalCard = () => {
    return 'Hello card';
};
export default IdentifierModal;
