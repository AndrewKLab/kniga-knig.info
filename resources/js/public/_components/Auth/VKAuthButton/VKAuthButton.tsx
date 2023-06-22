import React, { FunctionComponent, useEffect, useState } from "react";
import { authService } from "../../../_services";
import './index.css'
import { Image } from "../../UI";

export interface VKAuthButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactElement | React.ReactFragment;
    className?: string;
    referal_user?: string | null;
}

export const VKAuthButton: FunctionComponent<VKAuthButtonProps> = ({ children, className, referal_user, ...other }) => {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    useEffect(() => {
        authService.vkAuthUrl({}).then((res) => {
            if (res?.url) setAuthUrl(res.url)
        })
    }, [])

    return <a className={`vk_auth_button${className ? ` ${className}` : ''}`} {...other} href={authUrl}><Image src={`icons/vk_login_icon.svg`} /></a>
} 