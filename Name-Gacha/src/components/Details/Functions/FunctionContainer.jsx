/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import FunctionCard from './FunctionCard';
import { useMutation, useQueryClient } from 'react-query';
import { createFunction } from '../../../utils/api/aws/functionRoutes';

export default function FunctionContainer({ functions }) {
    const [isAdd, setIsAdd] = useState(false);
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ functionName, functionExp }) => {
            return createFunction(functionName, functionExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /**Basic functions */
    const handleKeyDownAddFunction = (e) => {
        const input = e.target;
        if (input.varName) {
            if (e.key === 'Escape') {
                cancelNewFunction();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelNewFunction();
            } else if (e.key === 'Enter') {
                addNewFunction();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };

    const addNewFunction = () => {
        if (newName.length === 0) return;
        mutateAddFunction({ functionName: newName, functionExp: newExp });
        cancelNewFunction();
    };

    const cancelNewFunction = () => {
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
                            onKeyDown={(e) => handleKeyDownAddFunction(e)}
                        />
                    </div>
                    <div>
                        <label>Explanation</label>
                        <input
                            ref={expInputRef}
                            type="text"
                            name="varExp"
                            onKeyDown={(e) => handleKeyDownAddFunction(e)}
                        />
                    </div>
                    <button onClick={() => addNewFunction()}>save</button>
                    <button onClick={() => cancelNewFunction()}>cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdd(true)}>Add new variable</button>
            )}
            <button onClick={() => setIsAdd(true)}> Add new variable </button>
            <ul>
                {functions.map((f) => (
                    <li key={f.functionId}>
                        <FunctionCard function={f} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
