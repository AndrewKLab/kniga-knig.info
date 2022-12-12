import React, { FunctionComponent } from "react";
import './index.css'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: any;
    setIsOpen: any;
    centered: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({ children, className, isOpen, setIsOpen, centered, ...other }) => {
    return (
        <React.Fragment>
            <div className={`modal-container`} onClick={() => setIsOpen(false)} />
            <div className={`modal modal-dialog${isOpen ? ` open`:``}${centered ? ` modal-centered`:``}${className ? ` ${className}` : ''}`} {...other}>
                {children}
            </div>
        </React.Fragment>
    )
} 