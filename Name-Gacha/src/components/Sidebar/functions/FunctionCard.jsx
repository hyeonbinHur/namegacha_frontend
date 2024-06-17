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
            // 데이터 추가 후 'getCertainProjects' 쿼리를 다시 불러옴 (refetch)
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const queryClient = useQueryClient();

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
