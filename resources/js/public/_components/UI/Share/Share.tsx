import React, { FunctionComponent } from "react";
import { Image } from "../Image";
import './index.css'

export interface ShareProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement | React.ReactNode;
    className?: string;
    link:string;
    whatsapp?: boolean;
    viber?: boolean;
    telegram?: boolean;
    sms?: boolean;
    copy?: boolean;
}

export const Share: FunctionComponent<ShareProps> = ({ children, className, link, whatsapp, viber, telegram, sms, copy, ...other }) => {
    const openLink = (event, action) => {
        event.stopPropagation();
        action()
    }
    return <div className={`share${className ? ` ${className}` : ''}`} {...other}>
        {whatsapp ? <a onClick={(event) => openLink(event, window.open(`https://api.whatsapp.com/send?text=${link}`, 'share-whatsapp', 'width=800, height=400'))} data-action="share/whatsapp/share"  target={'_blank'}><div className="share-link"><Image src={`/icons/icons8-whatsapp.svg`}/></div></a> : null}
        {viber ? <a onClick={(event) => openLink(event, window.open(`viber://forward?text=${link}`, 'share-viber', 'width=800, height=400'))} target={'_blank'}><div className="share-link"><Image src={`/icons/icons8-viber.svg`}/></div></a> : null}
        {telegram ? <a onClick={(event) => openLink(event, window.open(`https://t.me/share/url?url=${link}`, 'share-tg', 'width=800, height=400'))}><div className="share-link"><Image src={`/icons/icons8-telegram-app.svg`}/></div></a> : null}
        {sms ? <a onClick={(event) => openLink(event, window.open(`sms:?&body=/${link}`, 'share-tg', 'width=800, height=400'))}><div className="share-link"><Image src={`/icons/sms-svgrepo-com.svg`}/></div></a> : null}
        {copy ? <a onClick={(event) => openLink(event, navigator.clipboard.writeText(link))}><div className="share-link"><Image src={`/icons/copy-svgrepo-com.svg`}/></div></a> : null}

        {children}
    </div>
} 