import React, { FunctionComponent } from "react";


export interface ListItemBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    itemAvatar?: React.ReactNode;
    itemAvatarClassName?: string;
    itemTitle?: React.ReactNode;
    itemTitleClassName?: string;
    itemDescription?: React.ReactNode;
}

export const ListItemBody: FunctionComponent<ListItemBodyProps> = ({ children, className, itemAvatar, itemAvatarClassName, itemTitle, itemTitleClassName, itemDescription, ...other }): JSX.Element => {
    return (
        <div className={`list-item-body${className ? ` ${className}` : ''}`} {...other}>
            {itemAvatar && <div className={`list-item-body-itemAvatar${itemAvatarClassName ? ` ${itemAvatarClassName}` : ''}`}>{itemAvatar}</div>}
            <div className={`list-item-body-text`}>
                {itemTitle && <div className={`list-item-body-title${itemTitleClassName ? ` ${itemTitleClassName}` : ``}`}>{itemTitle}</div>}
                {itemDescription && <div className={`list-item-body-description`}>{itemDescription}</div>}
            </div>
            {children}
        </div>
    )
}   