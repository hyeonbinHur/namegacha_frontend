import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import './VarCard.css';
export default function VarCard() {
    return (
        <div className="vars-container">
            <div className="name var-name">
                <AiFillFolderOpen className="folder" />
                <AiFillFolder className="folder" />
                <BsCaretDown className="arrow" />
                <BsCaretUp className="arrow" />
                Hello var
            </div>
        </div>
    );
}
