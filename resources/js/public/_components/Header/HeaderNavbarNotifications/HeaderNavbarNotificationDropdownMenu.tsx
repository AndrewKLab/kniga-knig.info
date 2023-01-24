import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, List, ListItem, Switch, ListItemProps, Button, Alert } from '../../UI';
import { User, Themes } from '../../../_interfaces';
import { useNavigate } from "react-router-dom";
import { FolderOutlineIcon } from "../../UI/Icons";
import moment from "moment";
import './index.css'
import { notificationsService } from "../../../_services";
import { notificationsActions } from "../../../_actions";
import { EyeOutlineIcon } from "../../UI/Icons/EyeOutlineIcon";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    setOpenDropdown: any;

    user: User;

    get_all_notifications_loading: boolean;
    get_all_notifications_message: null | string;
    get_all_notifications_error: null | string;

    mark_as_read_all_notifications_loading: boolean;
    mark_as_read_all_notifications_message: null | string;
    mark_as_read_all_notifications_error: null | string;

    notifications: Array<object>;
    unread_notifications_count: null | number;
}

const HeaderNavbarNotificationDropdownMenu: FunctionComponent<HeaderProps> = ({
    dispatch,
    children,
    className,
    setOpenDropdown,

    user,

    get_all_notifications_loading,
    get_all_notifications_message,
    get_all_notifications_error,

    mark_as_read_all_notifications_loading,
    mark_as_read_all_notifications_message,
    mark_as_read_all_notifications_error,

    notifications,
    unread_notifications_count
}): JSX.Element => {
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(notificationsActions.getAll());
    }, [])

    const markAsReadOneById = (event, id) => {
        event.stopPropagation()
        dispatch(notificationsActions.markAsReadOneById({ id: id }))
    }
    const markAsReadAll = () => {
        dispatch(notificationsActions.markAsReadAll())
    }

    const openNotificationLink = (notification) => {
        if(notification?.data?.link) document.location.href=notification?.data?.link;
    }

    return (
        <React.Fragment>
            <div className={`header-navbar-notification-dropdown-menu-header`}>
                <h4 className={`header-navbar-notification-dropdown-menu-title`}>Ваши уведомления ({notifications.length})</h4>
                <Button
                    className={`header-navbar-notification-dropdown-menu-button`}
                    onClick={() => markAsReadAll()}
                    disabled={mark_as_read_all_notifications_loading}
                    loading={mark_as_read_all_notifications_loading}
                >Прочитать все</Button>
            </div>
            {notifications && notifications.length > 0 ? (
                <List className={`header-navbar-notification-dropdown-menu-list`} dataSource={notifications} renderItem={(notification, index) =>
                    <ListItem
                        key={notification.id}
                        itemTitle={notification?.data?.message}
                        itemDescription={moment(notification?.created_at).fromNow()}
                        itemRightComponent={<IconButton icon={<EyeOutlineIcon />} onClick={(event) => markAsReadOneById(event, notification.id)} disabled={notification.read_at !== null} />}
                        onClick={()=>openNotificationLink(notification)}
                    />}
                />
            ) : (get_all_notifications_error && <Alert type={`info`} message={get_all_notifications_error} />)
            }
        </React.Fragment>
    )

}


function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_notifications_loading,
        get_all_notifications_message,
        get_all_notifications_error,

        mark_as_read_all_notifications_loading,
        mark_as_read_all_notifications_message,
        mark_as_read_all_notifications_error,

        notifications,
        unread_notifications_count,
    } = state.notifications;

    return {
        user,
        get_all_notifications_loading,
        get_all_notifications_message,
        get_all_notifications_error,

        mark_as_read_all_notifications_loading,
        mark_as_read_all_notifications_message,
        mark_as_read_all_notifications_error,

        notifications,
        unread_notifications_count,
    };
}
const connectedHeaderNavbarNotificationDropdownMenu = connect(mapStateToProps)(HeaderNavbarNotificationDropdownMenu);
export { connectedHeaderNavbarNotificationDropdownMenu as HeaderNavbarNotificationDropdownMenu };