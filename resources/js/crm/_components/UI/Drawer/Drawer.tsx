import React, { FunctionComponent, useRef } from "react";
import { useDetectOutsideClick } from '../../../_hooks';
import { DrawerMenu } from "./DrawerMenu";
import './index.css'


type Anchor = 'top' | 'left' | 'bottom' | 'right';
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    open?: boolean;
    setOpen?: any;
    drawer?: any;
    anchor: Anchor;
    overlay?:
    | React.ReactChild
    | React.ReactChild[];
    overlayClassName?: string;
}

export const Drawer: FunctionComponent<DrawerProps> = ({ children, className, open, setOpen, drawer, anchor, overlay, overlayClassName, ...other }) => {
    const drawerRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(drawerRef, false);



    return (
        <div className={`drawer${className ? ` ${className}` : ''}`} {...other}>

            <div ref={drawer ? drawer : drawerRef} className={`drawer-menu-container`}>
                <DrawerMenu className={`${overlayClassName}${anchor ? ` ${anchor}` : ''}`} isActive={open ? open : isActive}>{overlay}</DrawerMenu>
            </div>
        </div>
    )
} 