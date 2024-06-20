/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import VariableCard from './VariableCard';
import { useMutation, useQueryClient } from 'react-query';
import { createVariable } from '../../../utils/api/aws/variableRoutes';

export default function VariableContainer({ variables }) {
    const [isAdd, setIsAdd] = useState(false);
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ variableName, variableExp }) => {
            return createVariable(variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /**Basic functions */
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

    return (
        <div>
            {isAdd ? (
                <div>
                    <div>
                        <label>Name</label>{' '}
                        <input
                            ref={nameInputRef}
                            type="text"
                            name="varName"
                            onKeyDown={(e) => handleKeyDownAddVariable(e)}
                        />
                    </div>
                    <div>
                        <label>Explanation</label>
                        <input
                            ref={expInputRef}
                            type="text"
                            name="varExp"
                            onKeyDown={(e) => handleKeyDownAddVariable(e)}
                        />
                    </div>
                    <button onClick={() => addNewVariable()}>save</button>
                    <button onClick={() => cancelNewVariable()}>cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdd(true)}>Add new variable</button>
            )}
            <button onClick={() => setIsAdd(true)}> Add new variable </button>
            <ul>
                {variables.map((v) => (
                    <li key={v.variableId}>
                        <VariableCard variable={v} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
