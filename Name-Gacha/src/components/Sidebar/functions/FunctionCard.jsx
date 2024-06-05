/* eslint-disable react/prop-types */

import { TbFunction } from 'react-icons/tb';
import './FnCard.css';
export default function FunctionCard({ functions }) {
    return (
        <div className="fns-container">
            <div className="fn-name">
                <TbFunction className="icon" size="1.2rem" />
                function container
            </div>
            <div style={{ paddingLeft: '30%' }}>
                <ul>
                    {functions.map((fn, index) => (
                        <li key={index}>{fn.functionName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
