import React, { FunctionComponent } from "react";
import { config } from "../../../_helpers";
import "./index.css";


export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
}

export const Image: FunctionComponent<ImageProps> = ({ className, ...other }) => {
  return <img className={`image${className ? ` ${className}` : ''}`} {...other} src={`${config.appUrl}/assets/img/${other.src}`} />
} 