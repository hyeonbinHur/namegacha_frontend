/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as pageAPI from '../../../utils/api/aws/pageRoutes';
import { deleteVariablesInPage } from '../../../utils/api/aws/variableRoutes';
import { deleteFunctionsInPage } from '../../../utils/api/aws/functionRoutes';
import * as detailReducers from '../../../store/detailPageSlice';
import { useDispatch } from 'react-redux';
import DetailForm from './DetailForm';
import VariableCard from '../Variables/VariableCard';
import { createVariable } from '../../../utils/api/aws/variableRoutes';
export default function DetailTest({ variables, pageId }) {
    const componentTarget = {
        type: 'function',
        name: fn.functionName,
        id: fn.functionId,
        ext: fn,
        functionExp,
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction } = useMutation({
        mutationFn: ({ functionId, functionName, functionExp }) => {
            return functionAPI.updateFunction(
                functionId,
                functionName,
                functionExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const { mutate: mutateDeleteFunction } = useMutation({
        mutationFn: ({ functionId }) => {
            return functionAPI.deleteFunction(functionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const editFunction = (newName, newExp) => {
        if (newName.length === 0) return;
        mutateUpdateFunction({
            functionId: fn.functionId,
            functionName: newName,
            functionExp: newExp,
        });
    };
    const deleteFunction = (itemId) => {
        mutateDeleteFunction({ functionId: itemId });
    };

    const dispatch = useDispatch();
    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };

    return (
        <div>
            <DetailForm
                componentTarget={componentTarget}
                type={'Add'}
                apiAction={addNewFunction}
                startAction={startAdd}
            />
            {variables.map((v) => (
                <li key={v.variableId}>
                    <VariableCard variable={v} />
                </li>
            ))}
        </div>
    );
}
// export default function DetailTest() { // card
//     return <div></div>;
// }
