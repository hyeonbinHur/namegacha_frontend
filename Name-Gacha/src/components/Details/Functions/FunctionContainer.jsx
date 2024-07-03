/* eslint-disable react/prop-types */
import FunctionCard from './FunctionCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFunction } from '../../../utils/api/aws/functionRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
export default function FunctionContainer({ functions, pageId }) {
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
        <div className="detail-idf--main">
            <header className="detail-idf--header">
                <span className="detail-idf--header__name">Variable</span>
                <DetailForm
                    componentTarget={componentTarget}
                    type={'Add'}
                    apiAction={addNewFunction}
                    startAction={startAdd}
                    from="idf"
                />
            </header>

            <ul className="item-ul detail-idf--content">
                {functions.map((f) => (
                    <li key={f.functionId} className="item-li">
                        <FunctionCard fn={f} />
                        <hr className="divider" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
