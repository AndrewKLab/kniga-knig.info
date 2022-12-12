import React, { FunctionComponent, useEffect, useState } from "react";
import './index.css'
import { getFBCToken } from "../../firebase";

export interface NotificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const Notifications: FunctionComponent<NotificationsProps> = ({ children, className, ...other }) => {
  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getFBCToken(setTokenFound);
      if(data) console.log("Token is", data);
      return data;
    }
    tokenFunc()
  }, [setTokenFound])
  return <div className={`notification${className ? ` ${className}` : ''}`} {...other}>
    {children}
  </div>
} 