import React, { FunctionComponent, useRef } from "react";
import { useDetectOutsideClick } from '../../../_hooks';
import { DropdownMenu } from "./DropdownMenu";



export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    open?: boolean;
    setOpen?: any;
    dropdown?: any;
    overlay?:
    | React.ReactChild
    | React.ReactChild[];
    overlayClassName?: string;
    arrow?: boolean;
    disabled?: boolean;
    placement?: string;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({ children, className, open, setOpen, dropdown, overlay, overlayClassName, ...other }): JSX.Element => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClick = () => {
        if(open !== undefined) setOpen(!open)
        else setIsActive(!isActive);
    }

    return (
        <div className={`dropdown${className ? ` ${className}` : ''}`} {...other}>
            {children && React.cloneElement(children, { onClick: onClick })}
            <div ref={dropdown ? dropdown : dropdownRef} className={`dropdown-menu-container`}>
                <DropdownMenu className={overlayClassName} isActive={open ? open : isActive}>{overlay}</DropdownMenu>
            </div>
        </div>
    )
}

