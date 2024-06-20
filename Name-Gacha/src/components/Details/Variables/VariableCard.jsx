import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import * as variableAPI from '../../../utils/api/aws/variableRoutes';

/* eslint-disable react/prop-types */
export default function VariableCard({ variable }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(variable.variableName);
    const [newExp, setNewExp] = useState(variable.variableExp);

    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

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

    //update / delete
    /* Basic Fuctions */
    const handleKeyDownEditVariable = (e) => {
        const input = e.target;
        if (input.varName) {
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
        setIsEdit(false);
    };

    //handleKey down
    //save
    //cancel

    return (
        <div>
            {isEdit ? (
                <div>
                    <div>
                        <div>
                            <label>variable name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => handleKeyDownEditVariable(e)}
                            />
                        </div>
                        <div>
                            <label>variable Exp</label>
                            <input
                                type="text"
                                value={newExp}
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
                    <div>{variable.variableName}</div>
                    <div>{variable.variableExp}</div>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
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
