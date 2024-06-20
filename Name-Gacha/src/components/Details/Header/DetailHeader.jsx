import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as pageAPI from '../../../utils/api/aws/pageRoutes';
import { deleteVariablesInPage } from '../../../utils/api/aws/variableRoutes';
import { deleteFunctionsInPage } from '../../../utils/api/aws/functionRoutes';
import * as sliceUtils from '../../../utils/util/contextUtils';
import { useSelector, useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';

/* eslint-disable react/prop-types */
export default function DeatilHeader({ page }) {
    const [newName, setNewName] = useState(page.pageName);
    const [newExp, setNewExp] = useState(page.pageExp);

    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /** Redux variables */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceIsEdit = useSelector((state) => state.detailPageSlice.isEdit);
    /** Component Variables*/
    const componentTarget = {
        type: 'page',
        id: page.pageId,
        name: page.pageName,
    };
    const isTargetMatch = sliceUtils.isDetailVerify(
        sliceTarget,
        componentTarget
    );
    const componentIsEdit = sliceUtils.checkIsRename(
        isTargetMatch,
        sliceIsEdit
    );

    /*Http requset */
    //1. edit page
    //2. delete page (all variables and functions too)

    const queryClient = useQueryClient();
    const { mutate: mutateUpdatePage } = useMutation({
        mutationFn: ({ pageName, pageExp, pageId }) => {
            return pageAPI.updatePage(pageId, pageName, pageExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const { mutate: mutateDeletePage } = useMutation({
        mutationFn: ({ pageId }) => {
            return pageAPI.deletePage(pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    const { mutateAsync: mutateDeleteVariable } = useMutation({
        mutationFn: ({ pageId }) => {
            return deleteVariablesInPage(pageId);
        },
    });
    const { mutateAsync: mutateDeleteFunction } = useMutation({
        mutationFn: ({ pageId }) => {
            return deleteFunctionsInPage(pageId);
        },
    });
    /*Functions */
    const handleKeyDownEdit = (e) => {
        const input = e.target;
        if (e.key === 'Enter') {
            mutateUpdatePage({
                pageId: page.pageId,
                pageName: newName,
                pageExp: newExp,
            });
            dispatch(detailReducers.setClear());
        } else if (e.key === 'Escape') {
            setNewExp(page.pageExp);
            setNewName(page.pageName);
            dispatch(detailReducers.setClear());
        } else if (e.key === 'Tab') {
            e.preventDefault();

            if (input.name === 'pageName') {
                expInputRef.current.focus();
            } else {
                nameInputRef.current.focus();
            }
        }
    };
    const handleDeletePage = async () => {
        if (page.variables.length > 0) {
            await mutateDeleteVariable(page.pageId);
        }
        if (page.functions.length > 0) {
            await mutateDeleteFunction(page.pageId);
        }
        mutateDeletePage(page.pageId);
    };
    const handleSaveEdit = () => {
        mutateUpdatePage({
            pageId: page.pageId,
            pageName: newName,
            pageExp: newExp,
        });
        dispatch(detailReducers.setClear());
    };
    const handleCancelEdit = () => {
        setNewExp(page.pageExp);
        setNewName(page.pageName);
        dispatch(detailReducers.setClear());
    };

    /**Redux actions */

    const dispatch = useDispatch();

    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };

    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            <div>
                {componentIsEdit ? (
                    <div>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => handleKeyDownEdit(e)}
                            name="pageName"
                            ref={nameInputRef}
                        />
                        <input
                            value={newExp}
                            onChange={(e) => setNewExp(e.target.value)}
                            onKeyDown={(e) => handleKeyDownEdit(e)}
                            name="pageExp"
                            ref={expInputRef}
                        />
                        <div>
                            <button onClick={() => handleSaveEdit()}>
                                save
                            </button>
                            <button onClick={() => handleCancelEdit()}>
                                cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            page name : <span>{page.pageName}</span>
                        </div>
                        <div>
                            page explanation : <span>{page.pageExp}</span>
                        </div>
                        <div>
                            <button onClick={() => startEdit()}>
                                edit page
                            </button>
                            <button onClick={() => handleDeletePage()}>
                                delete page
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
