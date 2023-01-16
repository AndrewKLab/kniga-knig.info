import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, List, ListItem, Switch, ListItemProps, Button, TabsMenu } from '../UI';
import { User, Themes } from '../../_interfaces';
import { stylesActions, usersActions } from "../../_actions";
import { setTheme } from '../../_helpers';
import { StudentOutlineIcon, ChartLineUpOutlineIcon, InfoOutlineIcon, DoubleFoldersOutlineIcon, GearOutlineIcon, FolderOutlineIcon } from "../UI/Icons";
import { useNavigate } from "react-router-dom";
import {AllUsersModulesList, MyUsersModulesList, WithoutUsersModulesList } from "./HeaderNavbarDrawerMenuModulesLists";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    user: User;
    user_page_tab?: number;
    setOpenMobileDrawer: any;
}

const HeaderNavbarDrawerMenu: FunctionComponent<HeaderProps> = ({ dispatch, children, className, user, user_page_tab, setOpenMobileDrawer }): JSX.Element => {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1)

    const modules = [];
    if (
        user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_COORDINATOR'
    ) modules.push({ key: 0, menuTitle: 'Пользователи', module: <AllUsersModulesList/>})
    if (true) modules.push({ key: 1, menuTitle: 'Мои Пользователи', module: <MyUsersModulesList /> })
    if (true) modules.push({ key: 2, menuTitle: 'Пользователи Без', module: <WithoutUsersModulesList /> })

    const ActiveTab = () => {
        let tab = user_page_tab ? user_page_tab : modules[0].key;
        const module = modules.find(element => element.key === tab);
        return module.module;
    }

    const goToLink = (link: string) => {
        navigate(link)
    }

    const menuItems = () => {
        let menu_items: ListItemProps[] = [
            {
                itemAvatar: <InfoOutlineIcon color={location.pathname === '/guide' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} />,
                itemTitle: 'Руководство',
                onClick: () => goToLink('/guide'),
                itemLink: '/guide',
            },
        ];

        if (user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN') menu_items.push({
            itemAvatar: <ChartLineUpOutlineIcon color={location.pathname === '/statistic' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} />,
            itemTitle: 'Статистика',
            onClick: () => goToLink('/statistic'),
            itemLink: '/statistic',
        })
        if (user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER') menu_items.push({
            itemAvatar: <DoubleFoldersOutlineIcon color={location.pathname === '/courses' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} />,
            itemTitle: 'Курсы',
            onClick: () => goToLink('/courses'),
            itemLink: '/courses',
        })
        if (user?.role?.kk_role_type !== 'ROLE_PROMOUTER') menu_items.push({
            itemAvatar: <StudentOutlineIcon color={location.pathname === '/users' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} />,
            itemTitle: 'Пользователи',
            onClick: () => goToLink('/users'),
            itemLink: '/users',
            itemDropdown: <div className={`drawer_dropdown_menu_container`}>
                <TabsMenu className={`drawer_dropdown_menu`} activeTab={user_page_tab} setActiveTab={(tab) => dispatch(usersActions.setUsersPageTab(tab))} tabs={modules} />
                <ActiveTab />
            </div>,
        })
        if (user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN') menu_items.push({
            itemAvatar: <FolderOutlineIcon color={location.pathname === '/files' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} size={22} />,
            itemTitle: 'Файловый менеджер',
            onClick: () => goToLink('/files'),
            itemLink: '/files',
        })
        if (user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN') menu_items.push({
            itemAvatar: <GearOutlineIcon color={location.pathname === '/settings' ? "rgba(var(--primary-color),1)" : "rgba(var(--text-color), 1)"} size={22} />,
            itemTitle: 'Настройки',
            onClick: () => goToLink('/settings'),
            itemLink: '/settings',
        })



        return menu_items;
    }

    return (
        <React.Fragment>
            <List
                dataSource={menuItems()}
                renderItem={(item: ListItemProps, index: number) => (
                    <ListItem
                        className={`navbar-drawer-actions-list-item${location.pathname === item.itemLink ? ` active` : ``}`}
                        key={index}
                        itemType={item.itemType}
                        itemAvatar={item.itemAvatar}
                        // itemAvatarClassName={`navbar-вкф-actions-list-item-icon`}
                        itemTitle={item.itemTitle}
                        itemDescription={item.itemDescription}
                        itemRightComponent={item.itemRightComponent}
                        onClick={item.onClick}
                        itemDropdownActive={location.pathname === item.itemLink}
                        itemDropdown={item.itemDropdown}
                    />

                )} />
        </React.Fragment>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab } = state.users;
    return { user, user_page_tab };
}
const connectedHeaderNavbarDrawerMenu = connect(mapStateToProps)(HeaderNavbarDrawerMenu);
export { connectedHeaderNavbarDrawerMenu as HeaderNavbarDrawerMenu };