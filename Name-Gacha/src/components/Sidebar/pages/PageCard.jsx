/* eslint-disable react/prop-types */
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
// import { SlOptions } from 'react-icons/sl';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionCard from '../functions/FunctionCard';
import VarContainer from '../variables/VarContatiner.jsx';
import './pageCard.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';
import * as pageAPI from '../../../utils/api/aws/pageRoutes.js';
import * as functionAPI from '../../../utils/api/aws/functionRoutes.js';
import * as variableAPI from '../../../utils/api/aws/variableRoutes.js';
import { useMutation, useQueryClient } from 'react-query';

export default function PageCard({ page }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newPageName, setNewPageName] = useState(page.pageName);
    const [newVariableName, setNewVariableName] = useState('');
    const [newFunctionName, setNewFunctionName] = useState('');

    /**redux flags */
    const sliceIsContextOpen = useSelector(
        (state) => state.currentContextMenu.isOpen
    );

    const sliceContextTarget = useSelector(
        (state) => state.currentContextMenu.target
    );
    const sliceIsAdd = useSelector((state) => state.currentContextMenu.isAdd);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    const sliceAddType = useSelector(
        (state) => state.currentContextMenu.addType
    );
    /**component flags */
    const componentIsThis = contextUtil.isContextVerity(
        sliceContextTarget,
        page.pageName,
        page.pageId
    );

    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsContextOpen
    );

    const componentIsFunctionAdd = contextUtil.checkIsFunctionAdd(
        sliceAddType,
        componentIsThis,
        sliceIsAdd
    );
    const componentIsVariableAdd = contextUtil.checkIsVariableAdd(
        sliceAddType,
        componentIsThis,
        sliceIsAdd
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );

    /** Functions */
    const dispatch = useDispatch();

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                name: page.pageName,
                id: page.pageId,
            })
        );
    };

    const handleEditNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (newPageName.length == 0) return;
            else {
                mutateUpdatePage({
                    pageId: page.pageId,
                    pageName: newPageName,
                });
            }
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            setNewPageName(page.pageName);
            dispatch(closeContextMenu());
        }
    };

    const handleAddVariableKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (newVariableName.length == 0) {
                return;
            } else {
                mutateAddVariable({
                    pageId: page.pageId,
                    variableName: newVariableName,
                });
            }
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            setNewVariableName('');
            dispatch(closeContextMenu());
        }
    };

    const handleAddFunctionKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (newFunctionName.length === 0) return;
            else {
                mutateAddFunction({
                    pageId: page.pageId,
                    functionName: newFunctionName,
                });
            }
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            setNewFunctionName('');
            dispatch(closeContextMenu());
        }
    };
    /**HTTP Request */
    const queryClient = useQueryClient();
    // edit page name
    const { mutate: mutateUpdatePage } = useMutation({
        mutationFn: ({ pageId, pageName }) => {
            return pageAPI.updatePage(pageId, pageName);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    // add function
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ pageId, functionName }) => {
            return functionAPI.createFunction(functionName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    // add variable
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ pageId, variableName }) => {
            return variableAPI.createVariable(variableName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    return (
        <div>
            <div
                className="name name-main page-name"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div
                    className="name name-sub "
                    onContextMenu={(e) => handleContextMenu(e)}
                >
                    {isOpen ? (
                        <div>
                            <BsCaretUp className="arrow" />
                            <AiFillFolderOpen className="folder" />
                        </div>
                    ) : (
                        <div>
                            <BsCaretDown className="arrow" />
                            <AiFillFolder className="folder" />
                        </div>
                    )}
                    {componentIsEdit ? (
                        <input
                            value={newPageName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setNewPageName(e.target.value)}
                            onKeyDown={(e) => handleEditNameKeyDown(e)}
                        />
                    ) : (
                        <div>{page.pageName}</div>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="components-container">
                    <div>
                        {componentIsVariableAdd && (
                            <input
                                onClick={(e) => e.stopPropagation()}
                                value={newVariableName}
                                onChange={(e) =>
                                    setNewVariableName(e.target.value)
                                }
                                onKeyDown={(e) => handleAddVariableKeyDown(e)}
                            />
                        )}

                        <VarContainer
                            variables={page.variables}
                            pageId={page.pageId}
                        />
                    </div>
                    <div>
                        {componentIsFunctionAdd && (
                            <input
                                value={newFunctionName}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) =>
                                    setNewFunctionName(e.target.value)
                                }
                                onKeyDown={(e) => handleAddFunctionKeyDown(e)}
                            />
                        )}

                        <FunctionCard
                            functions={page.functions}
                            pageId={page.pageId}
                        />
                    </div>
                </div>
            )}

            {componentIsContextOpen && (
                <ContextMenu
                    type={'page'}
                    id={page.pageId}
                    name={page.pageName}
                    item={page}
                />
            )}
        </div>
    );
}
