import React, { FunctionComponent } from "react";
import './index.css'

export interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactElement | string;
  className?: string;
  icon: React.ReactElement;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({children, className, icon, ...other }) => {
  return <button className={`icon-button${className ? ` ${className}` : ''}`} {...other}>{icon}{children}</button>
} 