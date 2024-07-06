import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAiMessageExp } from '../../../../store/threadSlice';
import { clearIsEdit, setIsEdit } from '../../../../store/aiMessageEditSlice';
import * as aiUtil from '../../../../utils/util/contextUtils';
import { checkLength } from '../../../../utils/util/util';
import { isNotEmpty } from '../../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';
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
        const empty = isNotEmpty(newExp);
        const max = checkLength(newExp, 50);
        if (!empty) {
            toast.error('Definition should not be empty.');
            return;
        } else if (!max) {
            toast.error('Definition must be under 300 characters.');
            return;
        } else if (max && empty) {
            dispatch(
                editAiMessageExp({ arrayIndex: arrayIndex, newExp: newExp })
            );
            dispatch(clearIsEdit());
        }
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
                <div className="message--ai__exp-content">
                    <input
                        value={newExp}
                        onChange={(e) => setNewExp(e.target.value)}
                    />
                    <div>
                        <i
                            className="icon-basic-elaboration-bookmark-plus ai--icon"
                            onClick={() => startEditExpInSlice()}
                        />
                        <i
                            className="icon-basic-elaboration-bookmark-remove ai--icon__cancel"
                            onClick={() => cancelEditExp()}
                        />
                    </div>
                </div>
            ) : (
                <div className="message--ai__exp-content">
                    <div>{newExp}</div>
                    <i
                        className="icon-basic-elaboration-bookmark-minus ai--icon"
                        onClick={() => startEditExpInComponent()}
                    />
                </div>
            )}
        </div>
    );
}
