/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as detailUtil from '../../../utils/util/contextUtils';
import * as detailReducers from '../../../store/detailPageSlice';
/**
 * 
    componentTarget, // id, exp, type, name
    type, // Add or Edit
    apiAction, // update, add api function
    startAction, // start edit or start add
    deleteAction, // if type is Edit, delete function is required
 */
export default function DetailForm({
    componentTarget, // id, exp, type, name
    type, // Add or Edit
    apiAction, // update, add api  function
    startAction, // start edit or start add
    deleteAction, // if type is Edit, delete function is required
}) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');

    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    useEffect(() => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        }
    }, [componentTarget, type]);

    /**redux variable */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    // const sliceIsEdit = useSelector((state) => state.detailPageSlice.isEdit);
    // const sliceIsAdd = useSelector((state) => state.detailPageSlice.isAdd);

    const sliceFlag = useSelector(
        (state) => state.detailPageSlice[`is${type}`]
    );

    const componentIsTargetMatch = detailUtil.isDetailVerify(
        sliceTarget,
        componentTarget
    );

    const componentFlag = detailUtil[`checkIs${type}`](
        componentIsTargetMatch,
        sliceFlag
    );

    // const componentIsEdit = detailUtil.checkIsRename(
    //     componentIsTargetMatch,
    //     sliceIsEdit
    // );
    // const componentIsAdd = detailUtil.checkIsAdd(
    //     componentIsTargetMatch,
    //     sliceIsAdd
    // );

    /**dispatches */
    const dispatch = useDispatch();
    const cancelActions = () => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        } else {
            setNewName('');
            setNewExp('');
        }
        dispatch(detailReducers.setClear());
    };

    const handleKeyDown = (e) => {
        const input = e.target;
        if (input.name === 'name') {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                apiAction();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };

    /**basic functions */

    const startButtonAction = () => {
        apiAction(newName, newExp);
        cancelActions();
    };

    return (
        <div style={{ padding: '3rem 3rem', border: '1px solid black' }}>
            {componentFlag ? (
                <div>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={newName}
                            ref={nameInputRef}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="exp"
                            value={newExp}
                            ref={expInputRef}
                            onChange={(e) => setNewExp(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </div>
                    <button onClick={() => startButtonAction()}>save</button>
                    <button onClick={() => cancelActions()}> cancel </button>
                </div>
            ) : (
                <div>
                    {type === 'Edit' && (
                        <div>
                            <div> {componentTarget.name} </div>
                            <div> {componentTarget.exp}</div>
                            <button onClick={() => deleteAction()}>
                                delete
                            </button>
                        </div>
                    )}
                    <button onClick={() => startAction()}>start action</button>
                </div>
            )}
        </div>
    );
}

// component target
