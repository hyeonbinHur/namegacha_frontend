import logo from '../../assets/logo/black-logo-full.png';
import ProjectCard from './projects/ProjectCard.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCertainProjects } from '../../utils/api/aws/projectRoutes.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import * as projectAPI from '../../utils/api/aws/projectRoutes.js';
import { useState } from 'react';
export default function Header() {
    const [isAdd, setIsAdd] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const { user } = useAuthContext();
    const navigator = useNavigate();
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
        navigator('/auth');
    };
    const startAddProject = (e) => {
        e.preventDefault();
        if (newProjectName.length == 0) return;
        addProject({
            projectName: newProjectName,
            userId: user.uuid,
        });
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
                {user && (
                    <div>
                        {user.userId}
                        <div>
                            <i
                                className="icon-basic-elaboration-folder-plus"
                                style={{ fontSize: '2rem' }}
                                onClick={() => setIsAdd((prev) => !prev)}
                            ></i>
                            <button onClick={() => refetchGetProjects()}>
                                refetch
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <section>
                {user ? (
                    projects && projects.data.length > 0 ? (
                        <div className="project">
                            {isAdd && (
                                <div>
                                    <input
                                        value={newProjectName}
                                        onChange={(e) =>
                                            setNewProjectName(e.target.value)
                                        }
                                    />
                                    <button onClick={(e) => startAddProject(e)}>
                                        add project
                                    </button>
                                </div>
                            )}
                            <ul>
                                {projects.data.map((project) => (
                                    <li key={project.projectId}>
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
        </main>
    );
}
