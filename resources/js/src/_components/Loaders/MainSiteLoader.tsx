import React, { FunctionComponent } from "react";
import { Loading } from "../../../public/_components/UI";
import './index.css'

export interface MainSiteLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const MainSiteLoader: FunctionComponent<MainSiteLoaderProps> = ({ children, className, ...other }) => {
  return <div className={`main_site_loader${className ? ` ${className}` : ''}`} {...other}><Loading/></div>
} 