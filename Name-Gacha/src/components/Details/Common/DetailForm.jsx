/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as detailUtil from '../../../utils/util/contextUtils';
import * as detailReducers from '../../../store/detailPageSlice';

export default function DetailForm({
    componentTarget,
    type,
    apiAction,
    startAction,
    deleteAction,
}) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');

    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    useEffect(() => {
        if (type === 'edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp); // 여기서 'exp'가 실제로 존재하는지 확인 필요
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
        if (type === 'edit') {
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

    return (
        <div>
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
                        <label>variable Exp</label>
                        <input
                            type="text"
                            name="exp"
                            value={newExp}
                            ref={expInputRef}
                            onChange={(e) => setNewExp(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                    </div>
                    <button onClick={() => apiAction()}> save </button>
                    <button onClick={() => cancelActions()}> cancel </button>
                </div>
            ) : (
                <div>
                    <button onClick={() => startAction()}>action</button>
                    {type === 'edit' && (
                        <button onClick={() => deleteAction()}>delete</button>
                    )}
                </div>
            )}
        </div>
    );
}

// component target
