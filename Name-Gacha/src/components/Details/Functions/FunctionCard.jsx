/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as functionAPI from '../../../utils/api/aws/functionRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';

export default function FunctionCard({ fn }) {
    const componentTarget = {
        type: 'function',
        name: fn.functionName,
        id: fn.functionId,
        exp: fn.functionExp,
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction, status: isUpdateFunctionStatus } =
        useMutation({
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
    const { mutate: mutateDeleteFunction, status: isDeleteFunctionStatus } =
        useMutation({
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
    const isLoading = checkPendingStatus([
        isUpdateFunctionStatus,
        isDeleteFunctionStatus,
    ]);

    return (
        <DetailForm
            componentTarget={componentTarget}
            type={'Edit'}
            apiAction={editFunction}
            startAction={startEdit}
            deleteAction={deleteFunction}
            from="idf"
            isLoading={isLoading}
        />
    );
}
