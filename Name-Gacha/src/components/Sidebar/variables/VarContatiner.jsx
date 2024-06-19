/* eslint-disable react/prop-types */
import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
import VarCard from './VarCard.jsx';
import { useMutation, useQueryClient } from 'react-query';
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';
import { useSelector } from 'react-redux';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';

export default function VarContainer({ variables, page }) {
    const item = {
        id: page.pageId,
        name: page.pageName,
    };
    const sliceIsAdd = useSelector((state) => state.currentContextMenu.isAdd);
    const queryClient = useQueryClient();
    const { mutate: addVariable } = useMutation({
        mutationFn: ({ variableName, pageId }) => {
            return varAPI.createVariable(variableName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    // const commpoenentIsAdd = contextUtil.checkIsVariableAdd(
    //     'variable',
    //     componentIsThis,
    //     sliceIsAdd
    // );

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
            <section>
                {/* <ContextMenu type={'varContainer'} item={item} /> */}
            </section>
        </div>
    );
}
