import { GoSignOut } from 'react-icons/go';
import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { AiFillFolder } from 'react-icons/ai';
import AuthModal from '../Modal/Auth/AuthModal.jsx';
import * as projectAPI from '../../utils/api/aws/projectRoutes.js';
import { useRef, useState } from 'react';
import { useSignOut } from '../../hooks/useSignOut.js';
import { toast } from 'react-toastify';
import { checkLength } from '../../utils/util/util.js';
import { isNotEmpty } from '../../utils/util/authUtil.js';
export default function Header() {
    const { mutateSignOutUser } = useSignOut();
    const [isAdd, setIsAdd] = useState(false);

    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuthContext();
    const authModal = useRef(null);

    /**Http  request */
    const queryClient = useQueryClient();

    const {
        data: projects,
        refetch: refetchGetProjects,
        isLoading,
    } = useQuery({
        queryKey: ['getCertainProjects', user?.uuid],
        queryFn: () => getCertainProjects(user.uuid),
        onError: (error) => {
            console.error('Query failed:', error);
        },
        enabled: !!user,
    });

    const { mutate: addProject } = useMutation({
        mutationFn: ({ projectName, userId }) => {
            return projectAPI.createProject(projectName, userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /** basic functions */
    const moveToSignInPage = () => {
        authModal.current.open();
    };

    const handleOnKeyDownCreateProject = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const empty = isNotEmpty(newProjectName);
            const max = checkLength(newProjectName, 50);
            if (!empty) {
                toast.error('Variable name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Variable name must be under 30 characters.');
                return;
            } else if (max && empty) {
                addProject({
                    projectName: newProjectName,
                    userId: user.uuid,
                });
                setIsAdd(false);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsAdd(false);
            setNewProjectName('');
        }
    };
    return (
        <main className="sidebar-main">
            <header className="sidebar-header">
                <div className="sidebar-header__logo-container">
                    <img src={logo} className="sidebar-header__logo" />
                </div>
            </header>
            <hr className="divider" />
            <div>{isLoading && <div> is loading</div>}</div>
            {user && (
                <div>
                    <div className="sidebar-sub-header">
                        <div className="sidebar-sub-header--content">
                            <div className="sidebar-sub-header--content__feature">
                                <i
                                    className="icon-basic-elaboration-folder-plus sidebar-sub-header--content__feature__1"
                                    onClick={() => setIsAdd((prev) => !prev)}
                                ></i>
                                <i
                                    onClick={() => {
                                        refetchGetProjects(true),
                                            setIsAdd(false);
                                    }}
                                    className="icon-basic-elaboration-folder-refresh sidebar-sub-header--content__feature__2"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <section className="sidebar-project">
                {user ? (
                    projects && projects.data.length > 0 ? (
                        <div>
                            {isAdd && (
                                <div className="sidebar-project--create">
                                    <AiFillFolder className="sidebar-project--create__icon" />
                                    <input
                                        onKeyDown={(e) =>
                                            handleOnKeyDownCreateProject(e)
                                        }
                                        value={newProjectName}
                                        onChange={(e) =>
                                            setNewProjectName(e.target.value)
                                        }
                                        className="sidebar-project--create__input"
                                    />
                                </div>
                            )}
                            {/* {isPressReFetching ? (
                                <div> fetching </div>
                            ) : ( */}
                            <ul className="sidebar-project--container">
                                {projects.data.map((project) => (
                                    <li
                                        key={project.projectId}
                                        className="sidebar-project--card"
                                    >
                                        <ProjectCard project={project} />
                                    </li>
                                ))}
                            </ul>
                            {/* )} */}
                        </div>
                    ) : (
                        <div> No Projects </div>
                    )
                ) : (
                    <button
                        className="sidebar-project--signin-btn btn-round"
                        onClick={() => moveToSignInPage()}
                    >
                        sign in
                    </button>
                )}
            </section>
            {user && (
                <div className="sidebar-project--user">
                    <hr className="divider" />
                    {user.userId}
                    <GoSignOut
                        onClick={() => mutateSignOutUser()}
                        className="sidebar-project--user__sign-out"
                    />
                </div>
            )}

            <AuthModal ref={authModal} />
        </main>
    );
}
