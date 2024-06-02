import { TbFunction } from 'react-icons/tb';
import './FnCard.css';
export default function FunctionCard() {
    return (
        <div className="fns-container">
            <div className="fn-name">
                <TbFunction className="icon" size="1.2rem" />
                function container
            </div>
        </div>
    );
}
