/* eslint-disable react/prop-types */
import { BsCaretUp } from 'react-icons/bs';
import { BsCaretDown } from 'react-icons/bs';
import { AiFillFolder } from 'react-icons/ai';
// import { SlOptions } from 'react-icons/sl';
import { AiFillFolderOpen } from 'react-icons/ai';
import FunctionCard from '../functions/FunctionCard';
import VarCard from '../variabels/VarCard';
import './pageCard.css';
import { useState } from 'react';

export default function PageCard({ page }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div
                className="name name-main page-name"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="name name-sub ">
                    {isOpen ? (
                        <div>
                            <BsCaretUp className="arrow" />
                            <AiFillFolderOpen className="folder" />
                        </div>
                    ) : (
                        <div>
                            <BsCaretDown className="arrow" />
                            <AiFillFolder className="folder" />
                        </div>
                    )}
                    Page Name
                </div>
            </div>

            {isOpen && (
                <div className="components-container">
                    <div>
                        <VarCard
                            variables={page.variables}
                            pageId={page.pageId}
                        />
                    </div>
                    <div>
                        <FunctionCard
                            functions={page.functions}
                            pageId={page.pageId}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
