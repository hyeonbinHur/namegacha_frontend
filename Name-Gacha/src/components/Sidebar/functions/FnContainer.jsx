/* eslint-disable react/prop-types */

import { TbFunction } from 'react-icons/tb';
import './FnCard.css';
import * as fnAPI from '../../../utils/api/aws/functionRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FunctionCard from './FunctionCard';

export default function FunctionContainer({ functions, page }) {
    const { mutate: addFunction } = useMutation({
        mutationFn: ({ functionName, pageId, functionExp }) => {
            return fnAPI.createFunction(pageId, functionName, functionExp);
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
                            fuctionExp: '',
                            pageId: page.pageId,
                        })
                    }
                ></i>
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {functions.map((fn) => (
                        <li key={fn.functionId}>
                            <FunctionCard fnction={fn} page={page} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
