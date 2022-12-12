import React, { FunctionComponent } from "react";
import { Button } from "../Button";

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

export interface InputGroupButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactElement | React.ReactNode;
  className?: string;
}

export const InputGroupButton: FunctionComponent<InputGroupButtonProps> = ({ children, className, ...other }) => {
  return <Button className={`input-group-button${className ? ` ${className}` : ''}`} {...other}>{children}</Button>
}