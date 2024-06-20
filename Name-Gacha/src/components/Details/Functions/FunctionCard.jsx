/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as functionAPI from '../../../utils/api/aws/functionRoutes';
import { useSelector, useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import * as detailUtils from '../../../utils/util/contextUtils';

export default function FunctionCard({ fn }) {
    const [newName, setNewName] = useState(fn.functionName);
    const [newExp, setNewExp] = useState(fn.functionExp);

    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /**redux variable */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceIsEdit = useSelector((state) => state.detailPageSlice.isEdit);

    /**component variable */
    const componentTarget = {
        type: 'function',
        name: fn.functionName,
        id: fn.functionId,
    };
    const componentIsTargetMatch = detailUtils.isDetailVerify(
        sliceTarget,
        componentTarget
    );
    const comopnentIsEdit = detailUtils.checkIsRename(
        componentIsTargetMatch,
        sliceIsEdit
    );

    /**dispatches */
    const dispatch = useDispatch();
    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction } = useMutation({
        mutationFn: ({ functionId, functionName, functionExp }) => {
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

    const { mutate: mutateDeleteFunction } = useMutation({
        mutationFn: ({ functionId }) => {
            return functionAPI.deleteFunction(functionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /**Basic functions */
    const handleKeyDownEditFunction = (e) => {
        const input = e.target;
        if (input.name === 'fnName') {
            if (e.key === 'Escape') {
                cancelEditFunction();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelEditFunction();
            } else if (e.key === 'Enter') {
                editFunction();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };

    const editFunction = () => {
        if (newName.length === 0) return;
        mutateUpdateFunction({
            functionId: fn.functionId,
            functionName: newName,
            functionExp: newExp,
        });
        cancelEditFunction();
    };
    const cancelEditFunction = () => {
        setNewName('');
        setNewExp('');
        dispatch(detailReducers.setClear());
    };

    return (
        <div>
            {comopnentIsEdit ? (
                <div>
                    <div>
                        <div>
                            <label>function name</label>
                            <input
                                type="text"
                                ref={nameInputRef}
                                name="fnName"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => handleKeyDownEditFunction(e)}
                            />
                        </div>
                        <div>
                            <label>function Exp</label>
                            <input
                                type="text"
                                ref={expInputRef}
                                name="fnExp"
                                value={newExp}
                                onChange={(e) => setNewExp(e.target.value)}
                                onKeyDown={(e) => handleKeyDownEditFunction(e)}
                            />
                        </div>
                    </div>
                    <button onClick={() => editFunction()}>save</button>
                    <button onClick={() => cancelEditFunction()}>cancel</button>
                </div>
            ) : (
                <div>
                    <div>{fn?.functionName}</div>
                    <div>{fn?.functionExp}</div>
                    <button onClick={() => startEdit()}>Edit</button>
                    {/* <button onClick={() => console.log('hello')}>Edit</button> */}
                    <button
                        onClick={() =>
                            mutateDeleteFunction({
                                functionId: fn.functionId,
                            })
                        }
                    >
                        delete
                    </button>
                </div>
            )}
        </div>
    );
}
