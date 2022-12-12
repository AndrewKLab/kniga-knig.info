import React, { FunctionComponent } from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

export const Switch: FunctionComponent<SwitchProps> = ({ className, ...other }) => {
    return <label className={`switch${className ? ` ${className}` : ''}`}>
        <input
            type="checkbox"
            className={'switch-input'}
            {...other}
        />
        <span className="switch" />
    </label>;
} 
