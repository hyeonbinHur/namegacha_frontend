/* eslint-disable react/prop-types */
import VariableCard from './VariableCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVariable } from '../../../utils/api/aws/variableRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';

export default function VariableContainer({ variables, pageId }) {
    const componentTarget = {
        type: 'variableConatiner',
        name: 'variableConatinerName',
        exp: '',
        id: 'variableContainerId',
    };
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ variableName, variableExp, pageId }) => {
            console.log(pageId);
            return createVariable(pageId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const addNewVariable = (newName, newExp) => {
        if (newName.length == 0) {
            console.log(newName);
            console.log('add fail');
            return;
        }
        mutateAddVariable({
            pageId: pageId,
            variableName: newName,
            variableExp: newExp,
        });
    };
    /**Functions */
    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };
    return (
        <div className="detail-idf--main">
            <header className="detail-idf--header">
                <span className="detail-idf--header__name">Variable</span>
                <DetailForm
                    componentTarget={componentTarget}
                    type={'Add'}
                    apiAction={addNewVariable}
                    startAction={startAdd}
                    from="idf"
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
