/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import VariableCard from './VariableCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVariable } from '../../../utils/api/aws/variableRoutes';
import * as sliceUtils from '../../../utils/util/contextUtils';
import { useSelector, useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';

export default function VariableContainer({ variables, pageId }) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);
    /**redux variables */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceIsAdd = useSelector((state) => state.detailPageSlice.isAdd);
    /**component variables */
    const componentTarget = {
        type: 'variableConatiner',
        name: 'variableConatinerName',
        id: 'variableContainerId',
    };
    const componentIsTargetMatch = sliceUtils.isDetailVerify(
        sliceTarget,
        componentTarget
    );
    const componentIsAdd = sliceUtils.checkIsAdd(
        componentIsTargetMatch,
        sliceIsAdd
    );
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ variableName, variableExp, pageId }) => {
            return createVariable(pageId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /**dispatches */
    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };
    /**Basic functions */
    const handleKeyDownAddVariable = (e) => {
        const input = e.target;
        if (input.name === 'varName') {
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
        if (newName.length == 0) {
            console.log(newName);
            console.log('add fail');
            return;
        }
        mutateAddVariable({
            pageId: pageId,
            variableName: newName,
            variableExp: newExp,
        });
        cancelNewVariable();
    };
    const cancelNewVariable = () => {
        setNewName('');
        setNewExp('');
        dispatch(detailReducers.setClear());
    };
    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            {componentIsAdd ? (
                <div>
                    <div>
                        <label>Name</label>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            ref={nameInputRef}
                            type="text"
                            name="varName"
                            onKeyDown={(e) => handleKeyDownAddVariable(e)}
                        />
                    </div>
                    <div>
                        <label>Explanation</label>
                        <input
                            value={newExp}
                            onChange={(e) => setNewExp(e.target.value)}
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
                <button onClick={() => startAdd()}>Add new variable</button>
            )}
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
