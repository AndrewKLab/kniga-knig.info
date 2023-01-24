import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, Dropdown, Badge } from '../../UI';
import { User } from '../../../_interfaces';
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../../../_hooks";
import { BellOutlineIcon } from "../../UI/Icons";
import { HeaderNavbarNotificationDropdownMenu } from "../";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    iconSize?: number;

    user: User;

    get_all_notifications_loading: boolean,
    get_all_notifications_message: null|string,
    get_all_notifications_error: null|string,
    notifications: object[],
    unread_notifications_count: null|number,
}

const HeaderNavbarNotificationDropdown: FunctionComponent<HeaderProps> = ({ 
    dispatch, 
    children, 
    className, 
    iconSize = 38,
    user, 

    get_all_notifications_loading,
    get_all_notifications_message,
    get_all_notifications_error,
    notifications,
    unread_notifications_count,
}): JSX.Element => {
    const navigate = useNavigate();
    const notificationsDropdownRef = useRef(null);
    const [openNotificationsDropdown, setOpenNotificationsDropdown] = useDetectOutsideClick(notificationsDropdownRef, false);


    useEffect(() => {

    }, [])


    return <Dropdown
        open={openNotificationsDropdown}
        setOpen={setOpenNotificationsDropdown}
        dropdown={notificationsDropdownRef}
        overlay={<HeaderNavbarNotificationDropdownMenu setOpenDropdown={setOpenNotificationsDropdown} />}
        overlayClassName={`navbar-dropdown-actions header-navbar-notification-dropdown-menu`}
    >
        <IconButton icon={<BellOutlineIcon size={iconSize} color="#E5F8E2" />} >
            { unread_notifications_count && unread_notifications_count > 0 ? <Badge>{unread_notifications_count}</Badge> : null}
        </IconButton>

    </Dropdown>
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_notifications_loading,
        get_all_notifications_message,
        get_all_notifications_error,
        notifications,
        unread_notifications_count,
    } = state.notifications;
    return {
        user,

        get_all_notifications_loading,
        get_all_notifications_message,
        get_all_notifications_error,
        notifications,
        unread_notifications_count,
    };
}
const connectedHeaderNavbarNotificationDropdown = connect(mapStateToProps)(HeaderNavbarNotificationDropdown);
export { connectedHeaderNavbarNotificationDropdown as HeaderNavbarNotificationDropdown };