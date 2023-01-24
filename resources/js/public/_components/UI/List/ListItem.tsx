import React, { FunctionComponent } from "react";
import { ListItemBody } from './ListItemBody';
import { ListItemRightComponent } from './ListItemRightComponent';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    itemType?: string;
    itemAvatar?: React.ReactNode;
    itemAvatarClassName?: string;
    itemTitle?: React.ReactNode;
    itemTitleClassName?: string;
    itemDescription?: React.ReactNode;
    itemRightComponent?: React.ReactNode;
    itemRightComponentClassName?: string;
    renderDivider?: boolean;
    renderBorder?: boolean;
}

export const ListItem: FunctionComponent<ListItemProps> = ({ children, className, itemType, itemAvatar, itemAvatarClassName, itemTitle, itemTitleClassName, itemDescription, itemRightComponent, itemRightComponentClassName, renderDivider, renderBorder, ...other }): JSX.Element => {
    return (
            <div className={`list-item${className ? ` ${className}` : ''}${itemType ? ` ${itemType}` : ''}${other.onClick ? ` list-item-action` : ''}${renderDivider ? ` list-item-divider` : ''}${renderBorder ? ` list-item-border` : ''}`} {...other}>
                {itemAvatar || itemTitle || itemDescription ? <ListItemBody itemAvatar={itemAvatar} itemAvatarClassName={itemAvatarClassName} itemTitleClassName={itemTitleClassName} itemTitle={itemTitle} itemDescription={itemDescription} /> : null}
                {itemRightComponent ? <ListItemRightComponent className={itemRightComponentClassName}>{itemRightComponent}</ListItemRightComponent> : null}
                {children}

            </div>
    )
}   