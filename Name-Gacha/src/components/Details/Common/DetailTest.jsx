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
    // variable container

    const componentTarget = {
        type: 'functionContainer',
        id: 'functionContainerId',
        name: 'functionContainerName',
        exp: '',
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ functionName, functionExp, pageId }) => {
            return createFunction(pageId, functionName, functionExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const addNewFunction = (newName, newExp) => {
        if (newName.length === 0) return;
        mutateAddFunction({
            functionName: newName,
            pageId: pageId,
            functionExp: newExp,
        });
    };

    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };

    return (
        <div>
            <DetailForm
                componentTarget={componentTarget}
                type={'Add'}
                apiAction={addNewVariable}
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
