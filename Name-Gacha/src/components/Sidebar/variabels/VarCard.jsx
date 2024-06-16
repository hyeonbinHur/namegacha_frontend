/* eslint-disable react/prop-types */

import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
export default function VarCard({ variables }) {
    return (
        <div className="vars-container">
            <div className="var-name">
                <HiOutlineVariable className="icon" size="1.2rem" />
                var container
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {variables.map((variable, index) => (
                        <li key={index}>{variable.variableName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
