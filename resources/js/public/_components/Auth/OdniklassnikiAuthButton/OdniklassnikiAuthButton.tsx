import React, { FunctionComponent, useEffect, useState } from "react";
import { authService } from "../../../_services";
import './index.css'
import { Image } from "../../UI";

export interface OdniklassnikiAuthButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactElement | React.ReactFragment;
    className?: string;
    referal_user?: string | null;
}

export const OdniklassnikiAuthButton: FunctionComponent<OdniklassnikiAuthButtonProps> = ({ children, className, referal_user, ...other }) => {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    useEffect(() => {
        authService.odnoklassnikiAuthUrl({}).then((res) => {
            if (res?.url) setAuthUrl(res.url)
        })
    }, [])

    return <a className={`odniklassniki_auth_button${className ? ` ${className}` : ''}`} {...other} href={authUrl}><Image src={`icons/ok_login_icon.svg`} /></a>
} 