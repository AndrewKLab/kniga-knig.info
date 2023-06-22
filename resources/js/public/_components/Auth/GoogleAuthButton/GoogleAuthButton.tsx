import React, { FunctionComponent, useEffect, useState } from "react";
import { authService } from "../../../_services";
import './index.css'
import { Image } from "../../UI";

export interface GoogleAuthButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactElement | React.ReactFragment;
    className?: string;
    referal_user?: string|null;
}

export const GoogleAuthButton: FunctionComponent<GoogleAuthButtonProps> = ({ children, className, referal_user, ...other }) => {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    useEffect(() => {
        authService.googleAuthUrl({}).then((res) => {
            if (res?.url) setAuthUrl(res.url)
        })
    }, [])

    return <a className={`google_auth_button${className ? ` ${className}` : ''}`} {...other} href={authUrl}><Image src={`icons/google_login_icon.svg`} /></a>
} 