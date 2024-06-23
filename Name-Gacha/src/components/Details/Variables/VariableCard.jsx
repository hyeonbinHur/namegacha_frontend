import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as variableAPI from '../../../utils/api/aws/variableRoutes';
import { useSelector, useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import * as detailUtils from '../../../utils/util/contextUtils';

/* eslint-disable react/prop-types */
export default function VariableCard({ variable }) {
    const [newName, setNewName] = useState(variable.variableName);
    const [newExp, setNewExp] = useState(variable.variableExp);
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /**redux variable */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceIsEdit = useSelector((state) => state.detailPageSlice.isEdit);

    /**component variable */
    const componentTarget = {
        type: 'variable',
        name: variable.variableName,
        id: variable.variableId,
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
    /* Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable } = useMutation({
        mutationFn: ({ variableId, variableName, variableExp }) => {
            return variableAPI.updateVariable(
                variableId,
                variableName,
                variableExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const { mutate: mutateDeleteVariable } = useMutation({
        mutationFn: ({ variableId }) => {
            return variableAPI.deleteVariable(variableId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /* Basic Fuctions */
    const handleKeyDownEditVariable = (e) => {
        const input = e.target;
        if (input.name === 'varName') {
            if (e.key === 'Escape') {
                cancelEditVariable();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelEditVariable();
            } else if (e.key === 'Enter') {
                editVariable();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };
    const editVariable = () => {
        if (newName.length === 0) return;
        mutateUpdateVariable({
            variableId: variable.variableId,
            variableName: newName,
            variableExp: newExp,
        });
        cancelEditVariable();
    };
    const cancelEditVariable = () => {
        setNewName('');
        setNewExp('');
        dispatch(detailReducers.setClear());
    };
    //handleKey down
    return (
        <div>
            {comopnentIsEdit ? (
                <div>
                    <div>
                        <div>
                            <label>variable name</label>
                            <input
                                type="text"
                                name="varName"
                                value={newName}
                                ref={nameInputRef}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => handleKeyDownEditVariable(e)}
                            />
                        </div>
                        <div>
                            <label>variable Exp</label>
                            <input
                                type="text"
                                name="expName"
                                value={newExp}
                                ref={expInputRef}
                                onChange={(e) => setNewExp(e.target.value)}
                                onKeyDown={(e) => handleKeyDownEditVariable(e)}
                            />
                        </div>
                    </div>
                    <button onClick={editVariable}>save</button>
                    <button onClick={cancelEditVariable}>cancel</button>
                </div>
            ) : (
                <div>
                    <div>{variable?.variableName}</div>
                    <div>{variable?.variableExp}</div>
                    <button onClick={() => startEdit()}>Edit</button>
                    <button
                        onClick={() =>
                            mutateDeleteVariable({
                                variableId: variable.variableId,
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
