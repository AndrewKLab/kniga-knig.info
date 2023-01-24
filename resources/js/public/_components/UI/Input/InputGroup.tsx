import React, { FunctionComponent } from "react";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string
}

export const InputGroup: FunctionComponent<InputGroupProps> = ({ children, className, ...other }) => {
  return <div className={`input-group${className ? ` ${className}` : ''}`} {...other}>{children}</div>
}

export interface InputGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string
}

export const InputGroupText: FunctionComponent<InputGroupTextProps> = ({ children, className, ...other }) => {
  return <span className={`input-group-text${className ? ` ${className}` : ''}`} {...other}>{children}</span>
}

