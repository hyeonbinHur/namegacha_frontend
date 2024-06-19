/* eslint-disable react/prop-types */

import { TbFunction } from 'react-icons/tb';
import './FnCard.css';
import * as fnAPI from '../../../utils/api/aws/functionRoutes';
import { useMutation, useQueryClient } from 'react-query';

export default function FunctionCard({ functions, pageId }) {
    const { mutate: addFunction } = useMutation({
        mutationFn: ({ functionName, pageId }) => {
            return fnAPI.createFunction(functionName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const queryClient = useQueryClient();
    // open context menu, close context menu, edit variable, delet variable, add variable

    return (
        <div className="fns-container">
            <div className="fn-name">
                <TbFunction className="icon" size="1.2rem" />
                function container
                <i
                    className="icon-basic-elaboration-message-plus"
                    onClick={() =>
                        addFunction({
                            functionName: 'add function test',
                            pageId: pageId,
                        })
                    }
                ></i>
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {functions.map((fn, index) => (
                        <li key={index}>{fn.functionName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
