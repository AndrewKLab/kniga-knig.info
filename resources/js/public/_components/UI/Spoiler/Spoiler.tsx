import React, { FunctionComponent, useState } from "react";
import { PlusCircleOutlineIcon } from "../Icons";
import { IconButton } from "../";
import './index.css'

export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    spoilerTitle?: React.ReactElement | string | null;
    spoilerContent?: React.ReactElement | string | null;
}

export const Spoiler: FunctionComponent<SpoilerProps> = ({ children, className, spoilerTitle, spoilerContent, ...other }) => {
    const [open, setOpen] = useState(false);

    const toggleSpoiler = () => {
        setOpen(!open)
    }
    return (
        <div className={`spoiler${className ? ` ${className}` : ''}`} {...other}>
            <div className={`spoiler-header`}>
                <div className={`spoiler-title${open ? ` opened` : ''}`}>{spoilerTitle}</div>
                {spoilerContent != '' ? <IconButton className={`spoiler-title-button${open ? ` opened` : ''}`} icon={<PlusCircleOutlineIcon color={open ? '#65B658' : 'none'} stroke={open ? '#fff' : 'rgba(var(--text-color), 1)'} />} onClick={toggleSpoiler} /> : null}
            </div>
            <div className={`spoiler-content${open ? ` opened` : ''}`}>
                {spoilerContent}
            </div>
            {children}
        </div>)
} 