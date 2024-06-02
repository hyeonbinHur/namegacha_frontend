import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import './FnCard.css';
export default function FunctionCard() {
    return (
        <div className="fns-container">
            <div className="name fn-name">
                <AiFillFolderOpen className="folder" />
                <AiFillFolder className="folder" />
                <BsCaretDown className="arrow" />
                <BsCaretUp className="arrow" />
                Hello Function
            </div>
        </div>
    );
}
