import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, List, ListItem, Switch, ListItemProps, Button } from '../UI';
import { User, Themes } from '../../_interfaces';
import { stylesActions } from "../../_actions";
import { setTheme } from '../../_helpers';
import { GearOutlineIcon, UserCircleOutlineIcon, ChatsCircleOutlineIcon, MoonStarsOutlineIcon } from "../UI/Icons";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    user: User;
    setOpenMobileDrawer: any;
}

const HeaderNavbarDrawerMenu: FunctionComponent<HeaderProps> = ({ dispatch, children, className, user, setOpenMobileDrawer }): JSX.Element => {
    let navigate = useNavigate();

    const goToLink = (link: string) =>{
        setOpenMobileDrawer(false)
        navigate(link)
    }

    const menuItems = () => {
        let menu_items: ListItemProps[] = [
            {
                // itemAvatar: <MoonStarsOutlineIcon size={38} color={'#E5F8E2'} />,
                itemTitle: 'Главная',
                onClick: () => goToLink('/home')
            },
            {
                // itemAvatar: <MoonStarsOutlineIcon size={38} color={'#E5F8E2'} />,
                itemTitle: 'Курсы',
                onClick: () => goToLink('/courses')
            },
            {
                // itemAvatar: <MoonStarsOutlineIcon size={38} color={'#E5F8E2'} />,
                itemTitle: 'О нас',
                onClick: () => goToLink('/about-us')
            },
            {
                // itemAvatar: <MoonStarsOutlineIcon size={38} color={'#E5F8E2'} />,
                itemTitle: 'Контакты',
                onClick: () => goToLink('/contacts')
            },
        ];

        // if (user) {
        //     menu_items.unshift(
        //         {
        //             itemAvatar: <UserCircleOutlineIcon size={38} />,
        //             itemTitle: 'Имя пользователя',
        //             itemDescription: 'Статус: Искатель',
        //             itemRightComponent: <IconButton icon={<GearOutlineIcon size={38} />} onClick={(e) => console.log(e)} />,
        //         },
        //         {
        //             itemType: 'divider'
        //         },
        //         {
        //             itemAvatar: <ChatsCircleOutlineIcon size={38} color={'#E5F8E2'} />,
        //             itemTitle: 'Мои диалоги',
        //             onClick: () => console.log(123)
        //         },
        //     )
        // }

        return menu_items;
    }

    return (
        <React.Fragment>
            <List
                dataSource={menuItems()}
                renderItem={(item: ListItemProps, index: number) => (
                    <ListItem
                        className={`navbar-dropdown-actions-list-item`}
                        key={index}
                        itemType={item.itemType}
                        itemAvatar={item.itemAvatar}
                        itemAvatarClassName={`navbar-dropdown-actions-list-item-icon`}
                        itemTitle={item.itemTitle}
                        itemDescription={item.itemDescription}
                        itemRightComponent={item.itemRightComponent}
                        onClick={item.onClick} />

                )} />
        </React.Fragment>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
const connectedHeaderNavbarDrawerMenu = connect(mapStateToProps)(HeaderNavbarDrawerMenu);
export { connectedHeaderNavbarDrawerMenu as HeaderNavbarDrawerMenu };