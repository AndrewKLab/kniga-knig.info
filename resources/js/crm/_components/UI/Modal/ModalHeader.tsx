import React, { FunctionComponent } from "react";
import { IconButton } from "../IconButton";
import { XCircleIcon } from "../Icons";
import './index.css'

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    setIsOpen: any;
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({ children, className, setIsOpen, ...other }) => {
    return <div className={`modal-header${className ? ` ${className}` : ''}`} {...other}>
        <h5 className={`modal-header-title`}>{children}</h5>
        <IconButton className={`modal-header-close-button`} icon={<XCircleIcon/>} onClick={() => setIsOpen(false)} />
    </div>
} 