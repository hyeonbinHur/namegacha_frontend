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
        <div className="sd-container">
            <header className="sd-container--heading">
                <span className="sd-container--heading__name">Functions</span>{' '}
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
            </header>

            <section className="sd-container--content">
                <ul className="sd-container--content__ul">
                    {functions.map((fn) => (
                        <li
                            key={fn.functionId}
                            className="sd-container--content__items"
                        >
                            <FunctionCard fnction={fn} page={page} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
