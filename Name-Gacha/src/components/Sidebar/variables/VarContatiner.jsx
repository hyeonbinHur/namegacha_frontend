/* eslint-disable react/prop-types */
import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
import VarCard from './VarCard.jsx';
import { useMutation, useQueryClient } from 'react-query';
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';

export default function VarContainer({ variables, pageId }) {
    const queryClient = useQueryClient();

    const { mutate: addVariable } = useMutation({
        mutationFn: ({ variableName, pageId }) => {
            return varAPI.createVariable(variableName, pageId);
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
                            pageId: pageId,
                        })
                    }
                ></i>
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {variables.map((variable) => (
                        <li key={variable.variableId}>
                            <VarCard variable={variable} pageId={pageId} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
