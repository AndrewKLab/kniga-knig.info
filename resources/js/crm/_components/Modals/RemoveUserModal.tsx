import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";

export interface RemoveUserModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    user: object | null;
    onDelete: any;

    remove_users_loading: boolean,
    remove_users_message: string | null,
    remove_users_error: string | null,
    remove_users: any,
}

const RemoveUserModal: FunctionComponent<RemoveUserModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    user,
    onDelete,

    remove_users_loading,
    remove_users_message,
    remove_users_error,
    remove_users,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить пользователя</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить пользователя {`"${user?.kk_user_lastname} ${user?.kk_user_firstname}"`}? Вместе с ним будут удалены все его прохождения курсов и сообщения в чатах.
            </ModalBody>
            <ModalActions>
                <Button color={'primary'} onClick={onDelete} loading={remove_users_loading} disabled={remove_users_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        remove_users_loading,
        remove_users_message,
        remove_users_error,
        remove_users,
    } = state.users;
    return {
        remove_users_loading,
        remove_users_message,
        remove_users_error,
        remove_users,
    };
}
const connectedRemoveUserModal = connect(mapStateToProps)(RemoveUserModal);
export { connectedRemoveUserModal as RemoveUserModal };