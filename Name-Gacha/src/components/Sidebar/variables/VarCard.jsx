/* eslint-disable react/prop-types */
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice.js';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';

export default function VarCard({ variable, page }) {
    /* state */
    const [newVariableName, setNewVariableName] = useState(
        variable.variableName
    );
    const item = {
        ...variable,
        ...page,
    };
    /* redux variables */
    const sliceTarget = useSelector((state) => state.currentContextMenu.target);
    const sliceIsOpen = useSelector((state) => state.currentContextMenu.isOpen);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    /*component variables */
    const componentIsThis = contextUtil.isContextVerity(
        sliceTarget,
        variable.variableName,
        variable.variableId
    );
    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsOpen
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );
    /* Functions */
    const dispatch = useDispatch();
    const handleContextMenuOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                name: variable.variableName,
                id: variable.variableId,
            })
        );
    };
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable } = useMutation({
        mutationFn: ({ variableName, variableId }) => {
            return varAPI.updateVariable(variableId, variableName);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const handleKeyDownEditVariable = (e) => {
        if (e.key === 'Enter') {
            mutateUpdateVariable({
                variableName: newVariableName,
                variableId: variable.variableId,
            });
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            dispatch(closeContextMenu());
            setNewVariableName(variable.variableName);
        }
    };
    return (
        <div>
            <div onContextMenu={(e) => handleContextMenuOpen(e)}>
                {componentIsEdit ? (
                    <input
                        value={newVariableName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewVariableName(e.target.value)}
                        onKeyDown={(e) => handleKeyDownEditVariable(e)}
                    />
                ) : (
                    <div>{variable.variableName}</div>
                )}
            </div>
            <div>{componentIsThis}</div>
            <button onClick={() => console.log(variable)}> ?? </button>

            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'variable'} item={item} />
                )}
            </section>
        </div>
    );
}
