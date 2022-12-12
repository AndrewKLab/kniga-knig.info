import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, List, ListItem, Switch, ListItemProps, Button } from '../UI';
import { User, Themes } from '../../_interfaces';
import { stylesActions } from "../../_actions";
import { setTheme } from '../../_helpers';
import { GearOutlineIcon, UserCircleOutlineIcon, ChatsCircleOutlineIcon, XCircleIcon } from "../UI/Icons";
import { useNavigate, useLocation } from "react-router-dom";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    user: User;
    setOpenMainMenuMobileDropdown: any;
}

const HeaderNavbarMainDropdownMenu: FunctionComponent<HeaderProps> = ({ dispatch, children, className, user, setOpenMainMenuMobileDropdown }): JSX.Element => {
    const location = useLocation();
    let navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const goToLink = (link: string) =>{
        setActiveLink(link)
        setOpenMainMenuMobileDropdown(false)
        navigate(link)
    }

    const menuItems = () => {
        let menu_items: ListItemProps[] = [
            {
                itemAvatar: <div className={`navbar-mobile-main-menu-item-circle`}></div>,
                itemTitle: 'Главная',
                onClick: () => goToLink('/home'),
                link: '/',
                // itemRightComponent: <IconButton icon={<XCircleIcon size={26} />} onClick={(e) => console.log(e)} />,
            },
            {
                itemAvatar: <div className={`navbar-mobile-main-menu-item-circle`}></div>,
                itemTitle: 'Курсы',
                onClick: () => goToLink('/courses'),
                link: '/courses'
            },
            {
                itemAvatar: <div className={`navbar-mobile-main-menu-item-circle`}></div>,
                itemTitle: 'О нас',
                onClick: () => goToLink('/about-us'),
                link: '/about-us'
            },
            {
                itemAvatar: <div className={`navbar-mobile-main-menu-item-circle`}></div>,
                itemTitle: 'Контакты',
                onClick: () => goToLink('/contacts'),
                link: '/contacts'
            },
            {
                itemAvatar: <div className={`navbar-mobile-main-menu-item-circle`}></div>,
                itemTitle: 'Профиль',
                onClick: () => goToLink('/profile'),
                link: '/profile'
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
                className={`navbar-mobile-main-menu`}
                dataSource={menuItems()}
                renderItem={(item: ListItemProps, index: number) => (
                    <ListItem
                        className={`navbar-mobile-main-menu-item`}
                        key={index}
                        itemType={item.itemType}
                        itemAvatar={item.itemAvatar}
                        // itemAvatarClassName={`navbar-dropdown-actions-list-item-icon`}
                        itemTitle={item.itemTitle}
                        itemTitleClassName={`navbar-mobile-main-menu-item-text${activeLink === item.link ? ' active':''}`}
                        itemDescription={item.itemDescription}
                        itemRightComponent={item.itemRightComponent}
                        itemRightComponentClassName={`navbar-mobile-main-menu-item-rc`}
                        onClick={item.onClick} />

                )} />
        </React.Fragment>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const { currentTheme, themes } = state.style;
    return { user, currentTheme, themes };
}
const connectedHeaderNavbarMainDropdownMenu = connect(mapStateToProps)(HeaderNavbarMainDropdownMenu);
export { connectedHeaderNavbarMainDropdownMenu as HeaderNavbarMainDropdownMenu };