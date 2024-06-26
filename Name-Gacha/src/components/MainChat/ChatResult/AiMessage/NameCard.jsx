/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAiMessageName } from '../../../../store/threadSlice';
import * as aiUtil from '../../../../utils/util/contextUtils';
import { clearIsEdit, setIsEdit } from '../../../../store/aiMessageEditSlice';

export default function NameCard({ names, selectNewItem, arrayIndex }) {
    return (
        <div>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>
                        <NameCardUnit
                            name={name}
                            selectNewItem={selectNewItem}
                            nameIndex={index}
                            arrayIndex={arrayIndex}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = ({ name, selectNewItem, arrayIndex, nameIndex }) => {
    const [newName, setNewName] = useState(name);
    const dispatch = useDispatch();

    /**redux variable */
    const sliceTarget = useSelector((state) => state.aiMessageEditSlice.target);
    const sliceIsEdit = useSelector((state) => state.aiMessageEditSlice.isEdit);
    /**component variable */
    const componentTarget = {
        type: 'name',
        arrayIndex: arrayIndex,
        nameIndex: nameIndex,
    };

    const componentIsTargetMatch = aiUtil.isAiMessageVerify(
        sliceTarget,
        componentTarget
    );

    const componentIsEdit = aiUtil.checkIsEdit(
        componentIsTargetMatch,
        sliceIsEdit
    );

    const startEditNameInSlice = () => {
        dispatch(
            editAiMessageName({
                arrayIndex: arrayIndex,
                nameIndex: nameIndex,
                newName: newName,
            })
        );
        dispatch(clearIsEdit());
    };
    const startEditInComponent = () => {
        dispatch(setIsEdit({ target: componentTarget }));
    };

    const cancelEditName = () => {
        setNewName(name);
        dispatch(clearIsEdit());
    };

    return (
        <div>
            {componentIsEdit ? (
                <div>
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button onClick={() => startEditNameInSlice()}>save</button>
                    <button onClick={() => cancelEditName()}>cancel</button>
                </div>
            ) : (
                <div>
                    {newName}
                    <button onClick={() => selectNewItem(newName)}>
                        select
                    </button>
                    <button onClick={() => startEditInComponent()}>Edit</button>
                </div>
            )}
        </div>
    );
};
