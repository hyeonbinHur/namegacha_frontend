/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as variableAPI from '../../utils/api/aws/variableRoutes';
import { useMutation, useQueryClient } from 'react-query';

export default function VariableContextMenu({ item }) {
    const queryClient = useQueryClient();

    const { mutate: mutateDeleteVariable } = useMutation({
        mutationFn: ({ variableId }) => {
            return variableAPI.deleteVariable(variableId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const dispatch = useDispatch();

    const startRename = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(editItSelf({ name: item.variableName, id: item.variableId }));
    };

    const startAddVariable = (e) => {
        console.log('page name : ' + item.pageName);
        console.log('page Id : ' + item.pageId_frk);
        dispatch(
            addChild({
                addType: 'variable',
                name: item.pageName,
                id: item.pageId,
            })
        );
        e.stopPropagation();
    };

    return (
        <div>
            <button onClick={(e) => startRename(e)}>Rename</button>
            <button onClick={(e) => startAddVariable(e)}>new variable</button>
            <button
                onClick={() =>
                    mutateDeleteVariable({ variableId: item.variableId })
                }
            >
                delete
            </button>
        </div>
    );
}
