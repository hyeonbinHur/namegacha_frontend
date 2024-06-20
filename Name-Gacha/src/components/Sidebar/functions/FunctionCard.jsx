/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice';
import * as contextUtils from '../../../utils/util/contextUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as functionAPI from '../../../utils/api/aws/functionRoutes';
import ContextMenu from '../../ContextMenu/ContextMenu';
export default function FunctionCard({ fnction, page }) {
    const [newFunctionName, setNewFunctionName] = useState(
        fnction.functionName
    );
    const item = {
        ...fnction,
        ...page,
    };
    /* redux variable*/
    const sliceTarget = useSelector((state) => state.currentContextMenu.target);
    const sliceIsOpen = useSelector((state) => state.currentContextMenu.isOpen);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    /* component variable */
    const componentIsThis = contextUtils.isContextVerity(
        sliceTarget,
        fnction.functionName,
        fnction.functionId
    );
    const componentIsContextOpen = contextUtils.isContextOpen(
        componentIsThis,
        sliceIsOpen
    );
    const componentIsEdit = contextUtils.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );
    /* Functions*/
    const dispatch = useDispatch();
    const handleOpenContextMenu = (e) => {
        dispatch(
            openContextMenu({
                name: fnction.functionName,
                id: fnction.functionId,
            })
        );
        e.stopPropagation();
        e.preventDefault();
    };
    const handleKeyDownEditName = (e) => {
        if (e.key === 'Enter') {
            mutateUpdateFunction({
                functionId: fnction.functionId,
                functionExp: '',
                functionName: newFunctionName,
            });
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            dispatch(closeContextMenu());
            setNewFunctionName(fnction.functionName);
        }
    };

    /** HTTP request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction } = useMutation({
        mutationFn: ({ functionName, functionId, functionExp }) => {
            return functionAPI.updateFunction(
                functionId,
                functionName,
                functionExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    return (
        <div>
            <div onContextMenu={(e) => handleOpenContextMenu(e)}>
                {componentIsEdit ? (
                    <input
                        onClick={(e) => e.stopPropagation()}
                        value={newFunctionName}
                        onKeyDown={(e) => handleKeyDownEditName(e)}
                        onChange={(e) => setNewFunctionName(e.target.value)}
                    />
                ) : (
                    <div>{fnction.functionName}</div>
                )}
            </div>
            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'function'} item={item} />
                )}
            </section>
        </div>
    );
}
