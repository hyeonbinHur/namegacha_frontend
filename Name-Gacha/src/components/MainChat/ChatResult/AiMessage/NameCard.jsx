/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAiMessageName } from '../../../../store/threadSlice';

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
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();

    const startEditName = () => {
        dispatch(
            editAiMessageName({
                arrayIndex: arrayIndex,
                nameIndex: nameIndex,
                newName: newName,
            })
        );
        setIsEdit(false);
    };
    const cancelEditName = () => {
        setNewName(name);
        setIsEdit(false);
    };

    return (
        <div>
            {isEdit ? (
                <div>
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button onClick={() => startEditName()}>save</button>
                    <button onClick={() => cancelEditName()}>cancel</button>
                </div>
            ) : (
                <div>
                    {newName}
                    <button onClick={() => selectNewItem(newName)}>
                        select
                    </button>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};
