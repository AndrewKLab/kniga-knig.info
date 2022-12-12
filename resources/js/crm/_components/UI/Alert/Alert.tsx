import React, { FunctionComponent } from "react";
import './index.css'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
  message?:
  | React.ReactChild
  | React.ReactChild[];
  type?: string;
}

export const Alert: FunctionComponent<AlertProps> = ({ children, className, message, type, ...other }) => {
  return <div className={`alert${className ? ` ${className}` : ''}${type ? ` alert-${type}`: ``}`} {...other}>{message}</div>
} 