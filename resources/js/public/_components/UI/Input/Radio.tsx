import React, { FunctionComponent } from "react";
import './index.css'
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?:
  | React.ReactChild
  | React.ReactChild[];
}

export const Radio: FunctionComponent<RadioProps> = React.forwardRef(({ className, label, ...other }, ref) => {
  return (
    <div className={`radio`}>
      <input ref={ref} type={`radio`} className={`radio-input${className ? ` ${className}` : ''}`} {...other} />
      {label && <label htmlFor={other.id ? other.id : ''}>{label}</label>}
    </div>
  )
})
