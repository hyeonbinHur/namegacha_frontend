import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { AiFillFolder } from 'react-icons/ai';
import AuthModal from '../Modal/Auth/AuthModal.jsx';

// import { useEffect, useState } from 'react';
import * as projectAPI from '../../utils/api/aws/projectRoutes.js';
import { useRef, useState } from 'react';
export default function Header() {
    const [isAdd, setIsAdd] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuthContext();
    const authModal = useRef(null);

    /**Http  request */
    const queryClient = useQueryClient();
    const {
        data: projects,
        isLoading,
        refetch: refetchGetProjects,
    } = useQuery({
        queryKey: ['getCertainProjects', user?.uuid], // 쿼리 키에 user의 uuid를 포함시켜 각 uuid에 대해 별도의 캐시를 관리
        queryFn: () => getCertainProjects(user.uuid),
        enabled: !!user, // user가 존재할 때만 쿼리 실행
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
        e.preventDefault();
        if (e.key === 'Enter') {
            if (newProjectName.length == 0) return;
            addProject({
                projectName: newProjectName,
                userId: user.uuid,
            });
        } else if (e.key === 'Escape') {
            setIsAdd(false);
            console.log('escape presses');
        }
        setIsAdd(false);
    };

    return (
        <main className="sidebar-main">
            <header className="sidebar-header">
                <div className="sidebar-header__logo-container">
                    <img src={logo} className="sidebar-header__logo" />
                </div>
            </header>
            <div>{isLoading && <div> is loading</div>}</div>
            <div>
                <div className="sidebar-sub-header">
                    {user && (
                        <div className="sidebar-sub-header--content">
                            <div className="sidebar-sub-header--content__name">
                                {user.userId}
                            </div>
                            <div className="sidebar-sub-header--content__feature">
                                <i
                                    className="icon-basic-elaboration-folder-plus sidebar-sub-header--content__feature__1"
                                    onClick={() => setIsAdd((prev) => !prev)}
                                ></i>
                                <button onClick={() => refetchGetProjects()}>
                                    <i className="icon-basic-elaboration-folder-refresh sidebar-sub-header--content__feature__2"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <section className="sidebar-project">
                {user ? (
                    projects && projects.data.length > 0 ? (
                        <div>
                            {isAdd && (
                                <div className="sidebar-project--create">
                                    <AiFillFolder className="folder" />
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
                        </div>
                    ) : (
                        <div> No Projects </div>
                    )
                ) : (
                    <button onClick={() => moveToSignInPage()}>
                        go to sign in
                    </button>
                )}
            </section>
            <AuthModal ref={authModal} />
        </main>
    );
}
