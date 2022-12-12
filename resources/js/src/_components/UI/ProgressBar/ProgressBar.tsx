import React, { FunctionComponent } from "react";
import './index.css'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
  progress?: number; 
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({ children, progress = 0, className, ...other }) => {
  return <div className={`progres_bar${className ? ` ${className}` : ''}`} {...other}>
    <div className={`progres_bar_container`} style={{width: `${progress*100}%`}}></div>
  </div>
} 