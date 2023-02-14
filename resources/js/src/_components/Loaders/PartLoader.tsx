import React, { FunctionComponent } from "react";
import { Loading } from "../../../public/_components/UI";
import './index.css'

export interface PartLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const PartLoader: FunctionComponent<PartLoaderProps> = ({ children, className, ...other }) => {
  return <div className={`part_loader${className ? ` ${className}` : ''}`} {...other}><Loading/></div>
} 