import React, { FunctionComponent } from "react";
import { Loading } from "../Loading";
import './index.css'

export interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactElement;
  className?: string;
  icon: React.ReactElement;
  loading?: boolean;
  loadingSize?: number;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({ children, className, icon, loading, loadingSize = 32, ...other }) => {
  if (loading) return <Loading size={loadingSize} />
  else return <button type={`button`} className={`icon-button${className ? ` ${className}` : ''}`} {...other}>{icon}{children}</button>
} 