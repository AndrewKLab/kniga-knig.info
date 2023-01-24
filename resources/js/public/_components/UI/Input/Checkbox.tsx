import React, { FunctionComponent } from "react";
import './index.css'
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?:
  | React.ReactChild
  | React.ReactChild[];
}

export const Checkbox: FunctionComponent<CheckboxProps> = React.forwardRef(({ className, label, ...other }, ref) => {
  return (
    <div className={`checkbox`}>
      <input ref={ref} type={`checkbox`} className={`checkbox-input${className ? ` ${className}` : ''}`} {...other} />
      {label && <label htmlFor={other.id ? other.id : ''}>{label}</label>}
    </div>
  )
})
