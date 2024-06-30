import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAiMessageExp } from '../../../../store/threadSlice';
import { clearIsEdit, setIsEdit } from '../../../../store/aiMessageEditSlice';
import * as aiUtil from '../../../../utils/util/contextUtils';

/* eslint-disable react/prop-types */
export default function ExpCard({ exp, arrayIndex }) {
    const [newExp, setNewExp] = useState(exp);

    /**slice variables */
    const sliceTarget = useSelector((state) => state.aiMessageEditSlice.target);
    const sliceIsEdit = useSelector((state) => state.aiMessageEditSlice.isEdit);
    /**component variables */
    const componentTarget = {
        type: 'exp',
        arrayIndex: arrayIndex,
        nameIndex: null,
    };
    const componentIsTargetMatch = aiUtil.isAiMessageVerify(
        sliceTarget,
        componentTarget
    );
    const componentIsEdit = aiUtil.checkIsEdit(
        componentIsTargetMatch,
        sliceIsEdit
    );
    /**redux dispathes */
    const dispatch = useDispatch();
    const startEditExpInSlice = () => {
        dispatch(editAiMessageExp({ arrayIndex: arrayIndex, newExp: newExp }));
        setIsEdit(false);
    };
    const startEditExpInComponent = () => {
        dispatch(setIsEdit({ target: componentTarget }));
    };
    const cancelEditExp = () => {
        setNewExp(exp);
        dispatch(clearIsEdit());
    };
    return (
        <div>
            {componentIsEdit ? (
                <div>
                    <input
                        value={newExp}
                        onChange={(e) => setNewExp(e.target.value)}
                    />
                    <button onClick={() => startEditExpInSlice()}>save</button>
                    <button onClick={() => cancelEditExp()}>cancel</button>
                </div>
            ) : (
                <div className="message--ai__exp-content">
                    <div>{newExp}</div>
                    <button
                        className="btn-text message--ai__exp-content__btn"
                        onClick={() => startEditExpInComponent()}
                    >
                        edit
                    </button>
                </div>
            )}
        </div>
    );
}
