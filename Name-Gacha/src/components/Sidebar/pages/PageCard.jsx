/* eslint-disable react/prop-types */
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
// import { SlOptions } from 'react-icons/sl';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionCard from '../functions/FunctionCard';
import VarCard from '../variabels/VarCard';
import './pageCard.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openContextMenu } from '../../../store/contextMenuSlice';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';

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
            console.log('Enter pressed ');
            console.log('new page name : ' + newPageName);
        } else if (e.key === 'Escape') {
            console.log('Escape pressed ');
            console.log('new page name : ' + newPageName);
        }
    };

    const handleAddVariableKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed ');
            console.log(newVariableName);
        } else if (e.key === 'Escape') {
            console.log('Escape pressed ');
            console.log(newVariableName);
        }
    };

    const handleAddFunctionKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed ');
            console.log(newFunctionName);
        } else if (e.key === 'Escape') {
            console.log('Escape pressed ');
            console.log(newFunctionName);
        }
    };

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

                        <VarCard
                            variables={page.variables}
                            pageId={page.pageId}
                        />
                    </div>
                    <div>
                        {componentIsFunctionAdd && (
                            <input
                                value={newFunctionName}
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
