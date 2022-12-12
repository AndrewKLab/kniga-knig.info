import React, { FunctionComponent } from "react";

export interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
    className?: string;
  }

export const Label: FunctionComponent<LabelProps> = ({ className, ...other }) => {
    return <label className={`label${className ? ` ${className}` : ''}`} {...other}>{}</label>;
} 
