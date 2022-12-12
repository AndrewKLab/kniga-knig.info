import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, List, ListItem, Switch, ListItemProps, Button } from '../UI';
import { User, Themes } from '../../_interfaces';
import { authActions, stylesActions } from "../../_actions";
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
    logout_loading: boolean;
    logout_message: null|string;
    logout_error: null|string;

    currentTheme: string;
    themes: Themes;

    setOpenDropdown: any;

}

const HeaderNavbarDropdownMenu: FunctionComponent<HeaderProps> = ({
    dispatch,
    children,
    className,
    setOpenDropdown,

    user,
    logout_loading,
    logout_message,
    logout_error,

    currentTheme,
    themes
}): JSX.Element => {
    const [themeState, setThemeState] = useState(currentTheme === 'dark');
    const navigate = useNavigate();

    useEffect(() => {
        setTheme(currentTheme, themes);
    }, [])

    const handleThemeChange = () => {
        let theme_color = '';
        if (currentTheme === 'light') theme_color = 'dark';
        else theme_color = 'light';

        setThemeState(!themeState)
        localStorage.setItem('theme', theme_color)
        const theme = { currentTheme: theme_color, themes: themes }
        dispatch(stylesActions.setTheme(theme))
        setTheme(theme_color, themes)
    }

    const openLink = (link: string) => {
        setOpenDropdown(false)
        navigate(link);
    }
    const logout = () => dispatch(authActions.logout())

    const menuItems = () => {
        let menu_items: ListItemProps[] = [
            {
                itemAvatar: <MoonStarsOutlineIcon size={38} color={'#E5F8E2'} />,
                itemTitle: 'Темная тема',
                itemRightComponent: <Switch checked={themeState} onChange={handleThemeChange} />,
            },
        ];

        if (user) {
            menu_items.unshift(
                {
                    itemAvatar: <UserCircleOutlineIcon size={38} />,
                    itemTitle: `${user.kk_user_lastname} ${user.kk_user_firstname}`,
                    itemDescription: `Статус: ${user.role.kk_role_name}`,
                    itemRightComponent: <IconButton icon={<GearOutlineIcon size={38} />} onClick={() => openLink('/profile')} />,
                },
                {
                    itemType: 'divider'
                },
                {
                    itemAvatar: <ChatsCircleOutlineIcon size={38} color={'#E5F8E2'} />,
                    itemTitle: 'Мои диалоги',
                    onClick: () => openLink(`/chats`)
                },
            )
        }

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
            <div className="navbar-dropdown-actions-button-container">
                {user ? (
                    <Button onClick={logout} loading={logout_loading} disabled={logout_loading}>Выйти из профиля</Button>
                ) : (
                    <React.Fragment>
                        <Button onClick={() => openLink(`/registration`)}>Регистрация</Button>
                        <Button onClick={() => openLink(`/login`)}>Вход</Button>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
}


function mapStateToProps(state) {
    const {
        user,
        logout_loading,
        logout_message,
        logout_error,
    } = state.auth;
    const { currentTheme, themes } = state.style;
    return {
        user,
        logout_loading,
        logout_message,
        logout_error,

        currentTheme,
        themes
    };
}
const connectedHeaderNavbarDropdownMenu = connect(mapStateToProps)(HeaderNavbarDropdownMenu);
export { connectedHeaderNavbarDropdownMenu as HeaderNavbarDropdownMenu };