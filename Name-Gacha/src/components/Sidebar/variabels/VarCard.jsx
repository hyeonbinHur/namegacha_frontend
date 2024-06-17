/* eslint-disable react/prop-types */

import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
import * as varAPI from '../../../utils/api/aws/variableRoutes';
import { useMutation, useQueryClient } from 'react-query';

export default function VarCard({ variables, pageId }) {
    const { mutate: addVariable } = useMutation({
        mutationFn: ({ variableName, pageId }) => {
            return varAPI.createVariable(variableName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const queryClient = useQueryClient();

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
                            pageId: pageId,
                        })
                    }
                ></i>
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {variables.map((variable, index) => (
                        <li key={index}>{variable.variableName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
