import React, { FunctionComponent, useState } from "react";
import './index.css'
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const TextInput: FunctionComponent<TextInputProps> = React.forwardRef(({ className, ...other }, ref) => {
  return <input ref={ref} className={`text-input${className ? ` ${className}` : ''}`} {...other} />;
})

export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea: FunctionComponent<TextAreaProps> = React.forwardRef(({ className, ...other }, ref) => {
  return <textarea ref={ref} className={`text-input${className ? ` ${className}` : ''}`} {...other} ></textarea>;
})

export interface InputErrorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errors?: object;
  name?: string;
}

export const InputError: FunctionComponent<InputErrorProps> = ({ className, errors, name, ...other }) => {
  return errors && errors[name] && errors[name].length > 0 ? <span className={`text-danger`} style={{whiteSpace: 'break-spaces'}}>{errors[name].join("\n")}</span> : null;
} 
