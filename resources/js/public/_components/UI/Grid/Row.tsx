import React, { FunctionComponent } from "react";
import "./index.css";

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
  g: number;
}

export const Row: FunctionComponent<RowProps> = ({ children, className, g, ...other }) => {
  return <div className={`row${className ? ` ${className}` : ''}${g ? ` g-${g}`:``}`} {...other}>{children}</div>
} 