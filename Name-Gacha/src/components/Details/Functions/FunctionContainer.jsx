/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import FunctionCard from './FunctionCard';
import { useMutation, useQueryClient } from 'react-query';
import { createFunction } from '../../../utils/api/aws/functionRoutes';
import { useSelector, useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import * as detailUtils from '../../../utils/util/contextUtils';

export default function FunctionContainer({ functions, pageId }) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);
    /** Redux variables */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceIsAdd = useSelector((state) => state.detailPageSlice.isAdd);
    /** Component Variables*/
    const componentTarget = {
        type: 'functionContainer',
        id: 'functionContainerId',
        name: 'functionContainerName',
    };
    const isTargetMatch = detailUtils.isDetailVerify(
        sliceTarget,
        componentTarget
    );
    const componentIsAdd = detailUtils.checkIsAdd(isTargetMatch, sliceIsAdd);
    /**dispatches */
    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ functionName, functionExp, pageId }) => {
            return createFunction(pageId, functionName, functionExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /**Basic functions */
    const handleKeyDownAddFunction = (e) => {
        const input = e.target;
        if (input.name === 'fnName') {
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
        mutateAddFunction({
            functionName: newName,
            pageId: pageId,
            functionExp: newExp,
        });
        cancelNewFunction();
    };

    const cancelNewFunction = () => {
        setNewName('');
        setNewExp('');
        dispatch(detailReducers.setClear());
    };

    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            {componentIsAdd ? (
                <div>
                    <div>
                        <label>Name</label>{' '}
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            ref={nameInputRef}
                            type="text"
                            name="fnName"
                            onKeyDown={(e) => handleKeyDownAddFunction(e)}
                        />
                    </div>
                    <div>
                        <label>Explanation</label>
                        <input
                            value={newExp}
                            onChange={(e) => setNewExp(e.target.value)}
                            ref={expInputRef}
                            type="text"
                            name="fnExp"
                            onKeyDown={(e) => handleKeyDownAddFunction(e)}
                        />
                    </div>
                    <button onClick={() => addNewFunction()}>save</button>
                    <button onClick={() => cancelNewFunction()}>cancel</button>
                </div>
            ) : (
                <button onClick={() => startAdd()}>Add new function</button>
            )}
            <ul>
                {functions.map((f) => (
                    <li key={f.functionId}>
                        <FunctionCard fn={f} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
