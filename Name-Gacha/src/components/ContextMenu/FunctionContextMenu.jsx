/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as functionAPI from '../../utils/api/aws/functionRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function FunctionContextMenu({ item }) {
    const queryClient = useQueryClient();
    const { mutate: mutateDeleteFunction } = useMutation({
        mutationFn: ({ functionId }) => {
            return functionAPI.deleteFunction(functionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const dispatch = useDispatch();

    const startRename = (e) => {
        console.log(item.functionName);
        console.log(item.functionId);
        e.preventDefault();
        e.stopPropagation();
        dispatch(editItSelf({ name: item.functionName, id: item.functionId }));
    };

    const startAddFunction = (e) => {
        console.log('page name : ' + item.pageName);
        console.log('page Id : ' + item.pageId_frk);
        dispatch(
            addChild({
                addType: 'function',
                name: item.pageName,
                id: item.pageId,
            })
        );
        e.stopPropagation();
    };

    return (
        <div>
            <button onClick={(e) => startRename(e)}>Rename</button>
            <button onClick={(e) => startAddFunction(e)}>new Functcion</button>
            <button
                onClick={() =>
                    mutateDeleteFunction({ functionId: item.functionId })
                }
            >
                delete
            </button>
        </div>
    );
}
