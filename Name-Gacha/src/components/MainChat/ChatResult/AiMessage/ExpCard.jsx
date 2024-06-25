import { useState } from 'react';

/* eslint-disable react/prop-types */
export default function ExpCard({ exp, handleExpChange }) {
    const [isEdit, setIsEdit] = useState(false);
    const cancelEditExp = () => {
        setIsEdit(false);
    };
    return (
        <div>
            {isEdit ? (
                <div>
                    <input
                        value={exp}
                        onChange={(e) => handleExpChange(e.target.value)}
                    />
                    <button onClick={() => setIsEdit(false)}>save</button>
                    <button onClick={() => cancelEditExp()}>cancel</button>
                </div>
            ) : (
                <div>
                    {exp}
                    <button onClick={() => setIsEdit(true)}>edit</button>
                </div>
            )}
        </div>
    );
}
