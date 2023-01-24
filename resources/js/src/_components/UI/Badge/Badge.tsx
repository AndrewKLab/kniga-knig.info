import React, { FunctionComponent } from "react";
import './index.css'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactElement | React.ReactFragment;
  className?: string;
}

export const Badge: FunctionComponent<BadgeProps> = ({ children, className, ...other }) => {
  return <div className={`badge${className ? ` ${className}` : ''}`} {...other}>{children}</div>
} 