import React, { FunctionComponent } from "react";
import './index.css'
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Divider: FunctionComponent<DividerProps> = ({ className, ...other }) => {
  return <hr className={`divider${className ? ` ${className}` : ''}`} {...other}/>
} 