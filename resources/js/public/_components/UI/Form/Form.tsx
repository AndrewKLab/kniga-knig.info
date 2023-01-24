import React, { FunctionComponent } from "react";
import './index.css'

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const Form: FunctionComponent<FormProps> = ({ children, className, ...other }) => {
  return <form className={`from${className ? ` ${className}` : ''}`} {...other}>{children}</form>
} 