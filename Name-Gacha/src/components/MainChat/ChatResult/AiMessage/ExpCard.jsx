import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAiMessageExp } from '../../../../store/threadSlice';
/* eslint-disable react/prop-types */
export default function ExpCard({ exp, arrayIndex }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newExp, setNewExp] = useState(exp);

    const dispatch = useDispatch();
    const startEditExp = () => {
        dispatch(editAiMessageExp({ arrayIndex: arrayIndex, newExp: newExp }));
        setIsEdit(false);
    };
    const cancelEditExp = () => {
        setNewExp(exp);
        setIsEdit(false);
    };
    return (
        <div>
            {isEdit ? (
                <div>
                    <input
                        value={newExp}
                        onChange={(e) => setNewExp(e.target.value)}
                    />
                    <button onClick={() => startEditExp()}>save</button>
                    <button onClick={() => cancelEditExp()}>cancel</button>
                </div>
            ) : (
                <div>
                    {newExp}
                    <button onClick={() => setIsEdit(true)}>edit</button>
                </div>
            )}
        </div>
    );
}
