import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Tabs, IconButton, Modal, ModalHeader, ModalBody, ModalActions, TabsMenu } from '../../_components/UI';
import { CoursesCard, PageAlert, PageLoader, PartAlert, PartLoader, RemoveCourseModal } from '../../_components';

import { User } from '../../_interfaces';
import { rolesCategoriesActions, rolesActions, settingsActions, usersActions } from "../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';

import moment from 'moment';
import { PenIcon, TrashIcon } from "../../_components/UI/Icons";


const UsersTableActions: FunctionComponent = ({ user, setIsOpenRemoveUserModal, setSelectedUserToModal }) => {
    let navigate = useNavigate();
    return (
        <div>
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/users/edit/${user.kk_user_id}`)} />
            <IconButton icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Удалить" onClick={() => { setIsOpenRemoveUserModal(true), setSelectedUserToModal(user) }} />
        </div>
    )
}


type UsersPageTableProps = {
    dispatch: any;
    user: User;

    loading: boolean;
    error_message: string | null;
    columns: object[];
    data: object[] | null;

    setSelectedUserToModal: any;
    setIsOpenRemoveUserModal: any;
}

const UsersPageTable: FunctionComponent<UsersPageTableProps> = ({
    dispatch,
    user,
    loading,
    error_message,
    columns = [
        {
            Header: 'ID',
            accessor: 'kk_user_id',
        },
        {
            Header: 'Фамилия',
            accessor: 'kk_user_lastname',
        },
        {
            Header: 'Имя',
            accessor: 'kk_user_firstname',
        },
        {
            Header: 'Телефон',
            accessor: row => `+7${row.kk_user_phonenumber}`,
        },
        {
            Header: 'E-mail',
            accessor: 'kk_user_email'
        },
        {
            Header: 'Страна',
            accessor: 'kk_user_country',
        },
        {
            Header: 'Город',
            accessor: 'kk_user_sity',
        },
        {
            Header: 'Община',
            accessor: 'kk_user_commune',
        },
        {
            Header: 'Действия',
            accessor: row => <UsersTableActions user={row} setIsOpenRemoveUserModal={setIsOpenRemoveUserModal} setSelectedUserToModal={setSelectedUserToModal} />,
        },
        {
            Header: 'Дата обновления',
            accessor: row => moment(row.kk_user_updated_at).format('DD.MM.YYYY HH:mm'),
        },
    ],
    data,

    setIsOpenRemoveUserModal,
    setSelectedUserToModal,
}): JSX.Element => {
    const memoried_columns = React.useMemo(() => columns, [])


    if (loading) return <PartLoader />
    if (error_message) return <PartAlert type={'danger'} message={error_message} />

    return <Table columns={memoried_columns} data={data} />;
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

const connectedUsersPageTable = connect(mapStateToProps)(UsersPageTable);
export { connectedUsersPageTable as UsersPageTable };