/* eslint-disable react/prop-types */
import VarCard from './VarCard.jsx';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import * as varAPI from '../../../utils/api/aws/variableRoutes.js';

export default function VarContainer({ variables, page }) {
    /* 컨텍스트 메뉴 일단 보류, add variable 말고 추가 할게 없음 */
    // const queryClient = useQueryClient();
    // const { mutate: addVariable } = useMutation({
    //     mutationFn: ({ variableName, variableExp, pageId }) => {
    //         return varAPI.createVariable(pageId, variableName, variableExp);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('getCertainProjects');
    //     },
    // });
    return (
        <div className="side-item--identifier">
            <span className="heading-quaternary">Variables</span>
            {/* <i
                    className="icon-basic-elaboration-message-plus sd-container--heading__icon"
                    onClick={() =>
                        addVariable({
                            variableName: 'add variable test',
                            variableExp: '',
                            pageId: variables[0].pageId_frk,
                        })
                    }
                ></i> */}
            <ul className="ul">
                {variables.map((variable) => (
                    <li key={variable.variableId} className="li">
                        <VarCard variable={variable} page={page} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
