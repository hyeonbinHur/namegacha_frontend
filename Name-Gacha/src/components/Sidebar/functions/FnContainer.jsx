/* eslint-disable react/prop-types */

// import * as fnAPI from '../../../utils/api/aws/functionRoutes';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import FunctionCard from './FunctionCard';

export default function FunctionContainer({ functions, page }) {
    // const { mutate: addFunction } = useMutation({
    //     mutationFn: ({ functionName, pageId, functionExp }) => {
    //         return fnAPI.createFunction(pageId, functionName, functionExp);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('getCertainProjects');
    //     },
    // });
    // const queryClient = useQueryClient();
    // open context menu, close context menu, edit variable, delet variable, add variable
    return (
        <div className="side-item--identifier">
            <span className="heading-quaternary">Functions</span>
            {/* <i
                    className="icon-basic-elaboration-message-plus"
                    onClick={() =>
                        addFunction({
                            functionName: 'add function test',
                            fuctionExp: '',
                            pageId: page.pageId,
                        })
                    }
                ></i> */}
            <ul className="ul">
                {functions.map((fn) => (
                    <li key={fn.functionId} className="li">
                        <FunctionCard fnction={fn} page={page} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
