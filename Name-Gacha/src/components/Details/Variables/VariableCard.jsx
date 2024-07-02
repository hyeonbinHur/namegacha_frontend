import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as variableAPI from '../../../utils/api/aws/variableRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';

/* eslint-disable react/prop-types */
export default function VariableCard({ variable }) {
    const componentTarget = {
        type: 'variable',
        name: variable.variableName,
        id: variable.variableId,
        exp: variable.variableExp,
    };
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable } = useMutation({
        mutationFn: ({ variableId, variableName, variableExp }) => {
            return variableAPI.updateVariable(
                variableId,
                variableName,
                variableExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const { mutate: mutateDeleteVariable } = useMutation({
        mutationFn: ({ variableId }) => {
            return variableAPI.deleteVariable(variableId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const editVariable = (newName, newExp) => {
        if (newName.length === 0) return;
        mutateUpdateVariable({
            variableId: variable.variableId,
            variableName: newName,
            variableExp: newExp,
        });
    };
    const deleteVariable = (itemId) => {
        mutateDeleteVariable({ variableId: itemId });
    };
    const dispatch = useDispatch();
    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };
    return (
        <DetailForm
            componentTarget={componentTarget}
            type={'Edit'}
            apiAction={editVariable}
            startAction={startEdit}
            deleteAction={deleteVariable}
            from="idf"
        />
    );
}
