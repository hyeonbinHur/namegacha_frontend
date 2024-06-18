/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as projectAPI from '../../utils/api/aws/projectRoutes';
import { useMutation, useQueryClient } from 'react-query';

export default function ProjectContextMenu({ target }) {
    const dispatch = useDispatch();

    const startRename = (e) => {
        dispatch(editItSelf({ name: target.name, id: target.id }));
        e.stopPropagation();
    };
    const startAddChild = (e) => {
        dispatch(
            addChild({ addType: 'page', name: target.name, id: target.id })
        );
        e.stopPropagation();
    };
    const queryClient = useQueryClient();

    const { mutate: deleteProject } = useMutation({
        mutationFn: ({ projectId }) => {
            return projectAPI.deleteProject(projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    return (
        <div>
            <button onClick={(e) => startRename(e)}>Rename</button>
            <div onClick={(e) => startAddChild(e)}>New Page</div>
            <div onClick={() => deleteProject({ projectId: target.id })}>
                Delete Project
            </div>
            <div>Share</div>
        </div>
    );
}
