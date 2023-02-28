import React, { FunctionComponent, useEffect, useState } from "react";
import { authService } from "../../../_services";
import './index.css'

export interface GoogleAuthButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactElement | React.ReactFragment;
    className?: string;
}

export const GoogleAuthButton: FunctionComponent<GoogleAuthButtonProps> = ({ children, className, ...other }) => {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    useEffect(() => {
        authService.googleAuthUrl({}).then((res) => {
            if (res?.url) setAuthUrl(res.url)
        })
    }, [])

    return <a className={`google_auth_button${className ? ` ${className}` : ''}`} {...other} href={authUrl}>{children}</a>
} 