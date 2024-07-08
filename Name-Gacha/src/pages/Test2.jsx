// import { useQuery, useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// // QueryClient 인스턴스 생성

// // 프로젝트 데이터를 가져오는 함수
// const getProjects = async () => {
//     try {
//         const endPoint =
//             'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project/projects?content=all';
//         const response = await axios.get(endPoint);
//         return response.data;
//     } catch (err) {
//         console.error(err.message);
//         throw err; // 에러를 던져야 React Query에서 인식 가능
//     }
// };

// // 프로젝트를 업데이트하는 함수
// const updateProject = async (projectId, projectName) => {
//     const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/project?projectId=${projectId}`;
//     const body = {
//         projectId: projectId,
//         projectName: projectName,
//     };
//     const response = await axios.put(endPoint, body);
//     return response.data;
// };

// export default function Test2() {
//     const { data: projects, refetch: refetchGetProjects } = useQuery({
//         queryKey: ['projects'],
//         queryFn: getProjects,
//     });

//     const {
//         mutate: mutateUpdateProject,
//         isError: isErrorGetProject,
//         error: errorGetProject,
//     } = useMutation({
//         mutationFn: ({ projectId, projectName }) =>
//             updateProject(projectId, projectName),
//         onSuccess: () => {
//             refetchGetProjects();
//         },
//     });

//     const handleMakeError = () => {
//         mutateUpdateProject({
//             projectId: 'make error',
//             projectName: 'make error',
//         });
//     };

//     const throwError = () => {
//         throw new Error('Error test');
//     };

//     const errorBoundaryTest = false;

//     if (errorBoundaryTest) {
//         throw new Error('Error thrown from ErrorComponent');
//     }

//     return (
//         <div>
//             <button onClick={handleMakeError}>Make Error</button>
//             {isErrorGetProject && <div>Error: {errorGetProject.message}</div>}
//             <div>
//                 {projects &&
//                     projects.map((project) => (
//                         <div key={project.projectId}>{project.name}</div>
//                     ))}
//             </div>
//             <button onClick={() => window.location.reload()}> refresh </button>
//             <button onClick={() => throwError()}> Throw error</button>
//         </div>
//     );
// }
