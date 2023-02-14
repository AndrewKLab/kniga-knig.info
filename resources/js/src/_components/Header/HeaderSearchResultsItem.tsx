import React, { FunctionComponent } from "react";
import { ListItem } from '../../../public/_components/UI';

export interface HeaderSearchResultsItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;

    item: any;
    openLink: any
}

export const HeaderSearchResultsItem: FunctionComponent<HeaderSearchResultsItemProps> = ({ item, openLink }): JSX.Element => {
    return (
        <ListItem
            className={`navbar-dropdown-actions-list-item`}
            itemTitle={item.kk_course_name}
            itemDescription={item.kk_course_description.length > 70 ? item.kk_course_description.substr(0, 80 - 1) + '...' : item.kk_course_description}
            onClick={() => openLink(item)}
            renderBorder={true}
        />
    )
}