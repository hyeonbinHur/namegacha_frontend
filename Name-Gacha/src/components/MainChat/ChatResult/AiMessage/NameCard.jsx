/* eslint-disable react/prop-types */

import { useState } from 'react';

export default function NameCard({ names, selectNewItem }) {
    return (
        <div>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>
                        <NameCardUnit
                            name={name}
                            selectNewItem={selectNewItem}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = ({ name, selectNewItem }) => {
    const [editName, setEditName] = useState(name);
    const [isEdit, setIsEdit] = useState(false);
    const cancelEditName = () => {
        setEditName(name);
        setIsEdit(false);
    };
    return (
        <div>
            {isEdit ? (
                <div>
                    <button onClick={() => setIsEdit(false)}>save</button>
                    <button onClick={() => cancelEditName()}>cancel</button>
                </div>
            ) : (
                <div>
                    {editName}
                    <button onClick={() => selectNewItem(editName)}>
                        select
                    </button>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};
