import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
    updateVariable,
    deleteVariable,
} from '../../../utils/api/aws/variableRoutes';

/* eslint-disable react/prop-types */
export default function VariableCard({ variable }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(variable.variableName);
    const [newExp, setNewExp] = useState(variable.variableExp);

    /* Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable } = useMutation({
        mutationFn: ({ variableId, variableName, variableExp }) => {
            return updateVariable(variableId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const { mutate: mutateDeleteVariable } = useMutation({
        mutationFn: ({ variableId }) => {
            return deleteVariable(variableId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    //update / delete
    /* Basic Fuctions */
    const handleKeyDownAddVariable = (e) => {
        const input = e.target;
        if (input.varName) {
            if (e.key === 'Escape') {
                cancelNewVariable();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelNewVariable();
            } else if (e.key === 'Enter') {
                addNewVariable();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };
    const addNewVariable = () => {
        if (newName.length === 0) return;
        mutateAddVariable({ variableName: newName, variableExp: newExp });
        cancelNewVariable();
    };
    const cancelNewVariable = () => {
        setNewName('');
        setNewExp('');
        setIsAdd(false);
    };

    //handleKey down
    //save
    //cancel

    return (
        <div>
            <div>{variable.variableName}</div>
            <div>{variable.variableExp}</div>
            {isEdit ? (
                <div>
                    <button>save</button>
                    <button>cancel</button>
                </div>
            ) : (
                <div>
                    <button>Edit</button>
                    <button>delete</button>
                </div>
            )}
        </div>
    );
}
