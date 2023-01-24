import React, { FunctionComponent } from "react";
import './index.css'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const Container: FunctionComponent<ContainerProps> = ({ children, className, ...other }) => {
  return <div className={`container${className ? ` ${className}` : ''}`} {...other}>{children}</div>
} 