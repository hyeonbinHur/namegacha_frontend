import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionCard from '../functions/FunctionCard';
import VarCard from '../variabels/VarCard';
import './pageCard.css';

export default function PageCard() {
    return (
        <div>
            <div className="name page-name">
                <AiFillFolderOpen className="folder" />
                <AiFillFolder className="folder" />
                <BsCaretDown className="arrow" />
                <BsCaretUp className="arrow" />
                Page Name
            </div>

            <div>
                <VarCard />
            </div>
            <div>
                <FunctionCard />
            </div>
        </div>
    );
}
