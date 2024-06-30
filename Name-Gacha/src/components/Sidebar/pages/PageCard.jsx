/* eslint-disable react/prop-types */
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
// import { SlOptions } from 'react-icons/sl';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionContainer from '../functions/FnContainer';
import VarContainer from '../variables/VarContatiner.jsx';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function PageCard({ page }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newPageName, setNewPageName] = useState(page.pageName);
    const [newVariableName, setNewVariableName] = useState('');
    const [newFunctionName, setNewFunctionName] = useState('');
    const navigate = useNavigate();

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
                    pageExp: '',
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
                    variableExp: '',
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
                    functionExp: '',
                    functionName: newFunctionName,
                });
            }
            dispatch(closeContextMenu());
        } else if (e.key === 'Escape') {
            setNewFunctionName('');
            dispatch(closeContextMenu());
        }
    };

    const handleNavigateToDetail = () => {
        navigate(`/detail/${page.pageId}`);
    };
    /**HTTP Request */
    const queryClient = useQueryClient();
    // edit page name
    const { mutate: mutateUpdatePage } = useMutation({
        mutationFn: ({ pageId, pageName, pageExp }) => {
            return pageAPI.updatePage(pageId, pageName, pageExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    // add function
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ pageId, functionName, functionExp }) => {
            return functionAPI.createFunction(
                pageId,
                functionName,
                functionExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    // add variable
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ pageId, variableName, variableExp }) => {
            return variableAPI.createVariable(
                pageId,
                variableName,
                variableExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    return (
        <div className="sd-item">
            <section onClick={() => setIsOpen((prev) => !prev)}>
                <div
                    className="sd-item--main"
                    onContextMenu={(e) => handleContextMenu(e)}
                >
                    {isOpen ? (
                        <div className="sd-item--main__icons">
                            <BsCaretUp className="" />
                            <AiFillFolderOpen className="" />
                        </div>
                    ) : (
                        <div className="sd-item--main__icons">
                            <BsCaretDown className="" />
                            <AiFillFolder className="" />
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
                        <div className="sd-item--main__name item-width-55">
                            {page.pageName}
                        </div>
                    )}
                </div>
            </section>
            <section className="sd-item--sub">
                {isOpen && (
                    <div
                        className="sd-item--sub__identifier-ul"
                        onClick={handleNavigateToDetail}
                    >
                        <div>
                            {componentIsVariableAdd && (
                                <input
                                    onClick={(e) => e.stopPropagation()}
                                    value={newVariableName}
                                    onChange={(e) =>
                                        setNewVariableName(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleAddVariableKeyDown(e)
                                    }
                                />
                            )}
                            {page.variables.length > 0 && (
                                <VarContainer
                                    variables={page.variables}
                                    page={page}
                                />
                            )}
                        </div>
                        <div>
                            {componentIsFunctionAdd && (
                                <input
                                    value={newFunctionName}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        setNewFunctionName(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleAddFunctionKeyDown(e)
                                    }
                                />
                            )}
                            {page.functions.length > 0 && (
                                <FunctionContainer
                                    functions={page.functions}
                                    page={page}
                                />
                            )}
                        </div>
                    </div>
                )}
            </section>

            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'page'} item={page} />
                )}
            </section>
        </div>
    );
}
