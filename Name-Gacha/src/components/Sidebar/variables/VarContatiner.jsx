/* eslint-disable react/prop-types */
import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
import VarCard from './VarCard.jsx';
import { useMutation, useQueryClient } from 'react-query';
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';

export default function VarContainer({ variables, page }) {
    /* 컨텍스트 메뉴 일단 보류, add variable 말고 추가 할게 없음 */
    const queryClient = useQueryClient();
    const { mutate: addVariable } = useMutation({
        mutationFn: ({ variableName, variableExp, pageId }) => {
            return varAPI.createVariable(pageId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    return (
        <div className="vars-container">
            <div className="var-name">
                <HiOutlineVariable className="icon" size="1.2rem" />
                var container
                <i
                    className="icon-basic-elaboration-message-plus"
                    onClick={() =>
                        addVariable({
                            variableName: 'add variable test',
                            variableExp: '',
                            pageId: variables[0].pageId_frk,
                        })
                    }
                ></i>
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {variables.map((variable) => (
                        <li key={variable.variableId}>
                            <VarCard variable={variable} page={page} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
