/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as pageAPI from '../../utils/api/aws/pageRoutes';
import { useMutation, useQueryClient } from 'react-query';
export default function PageContextMenu({ target }) {
    const dispatch = useDispatch();

    const startRename = (e) => {
        dispatch(editItSelf({ name: target.name, id: target.id }));
        e.stopPropagation();
    };

    const startAddFunction = (e) => {
        dispatch(
            addChild({ addType: 'function', name: target.name, id: target.id })
        );
        e.stopPropagation();
    };

    const startAddVariable = (e) => {
        dispatch(
            addChild({ addType: 'variable', name: target.name, id: target.id })
        );
        e.stopPropagation();
    };

    const queryClient = useQueryClient();

    const { mutate: deletePage } = useMutation({
        mutationFn: ({ pageId }) => {
            return pageAPI.deletePage(pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    return (
        <div>
            <div onClick={(e) => startRename(e)}>Rename</div>
            <div onClick={(e) => startAddVariable(e)}>New Variable</div>
            <div onClick={(e) => startAddFunction(e)}>New Function</div>
            <div onClick={() => deletePage({ pageId: target.id })}>Delete</div>
        </div>
    );
}
