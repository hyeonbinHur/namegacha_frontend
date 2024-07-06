/* eslint-disable react/prop-types */
import VariableCard from './VariableCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVariable } from '../../../utils/api/aws/variableRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';
import { checkLength } from '../../../utils/util/util';
import { isNotEmpty } from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';

export default function VariableContainer({ variables, pageId }) {
    const componentTarget = {
        type: 'variableConatiner',
        name: 'variableConatinerName',
        exp: '',
        id: 'variableContainerId',
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddVariable, status: isAddVariableStatus } =
        useMutation({
            mutationFn: ({ variableName, variableExp, pageId }) => {
                console.log(pageId);
                return createVariable(pageId, variableName, variableExp);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    const addNewVariable = (newName, newExp) => {
        const emptyName = isNotEmpty(newName);
        const maxName = checkLength(newName, 50);
        const emptyExp = isNotEmpty(newExp);
        const maxExp = checkLength(newExp, 300);
        if (!emptyName) {
            toast.error('Variable name should not be empty.');
            return;
        } else if (!maxName) {
            toast.error('Variable name must be under 30 characters.');
            return;
        } else if (!emptyExp) {
            toast.error('Variable definition hould not be empty.');
            return;
        } else if (!maxExp) {
            toast.error('Variable definition must be under 300 characters.');
            return;
        } else if (emptyName && maxName && emptyExp && maxExp) {
            mutateAddVariable({
                pageId: pageId,
                variableName: newName,
                variableExp: newExp,
            });
        }
    };

    /**Functions */
    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };
    const isLoading = checkPendingStatus([isAddVariableStatus]);

    return (
        <div className="detail-idf--main">
            <header className="detail-idf--header">
                <span className="detail-idf--header__name">Variables</span>
                <DetailForm
                    componentTarget={componentTarget}
                    type={'Add'}
                    apiAction={addNewVariable}
                    startAction={startAdd}
                    from="idf"
                    isLoading={isLoading}
                />
            </header>
            <ul className="item-ul detail-idf--content">
                {variables.map((v) => (
                    <li key={v.variableId} className="item-li">
                        <VariableCard variable={v} />
                        <hr className="divider" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
