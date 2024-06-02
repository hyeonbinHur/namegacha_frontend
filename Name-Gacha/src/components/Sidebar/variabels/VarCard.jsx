import { HiOutlineVariable } from 'react-icons/hi';
import './VarCard.css';
export default function VarCard() {
    return (
        <div className="vars-container">
            <div className="var-name">
                <HiOutlineVariable class="icon" size="1.2rem" />
                var container
            </div>
        </div>
    );
}
