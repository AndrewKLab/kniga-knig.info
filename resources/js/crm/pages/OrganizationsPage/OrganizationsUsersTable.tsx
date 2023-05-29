import React, { FunctionComponent, useEffect, useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Table } from "../../_components/UI";
import { Col, IconButton, Row } from "../../../public/_components/UI";
import { InfoIcon, PenIcon, TrashIcon } from "../../_components/UI/Icons";
import { MinusUserIcon } from "../../../public/_components/UI/Icons";
import { connect } from "react-redux";
import { organizationsUsersActions } from "../../_actions";


type OrganizationsUsersTableProps = {
    columns: [];
    data: [];
    onDelete: any;
}

const OrganizationsUsersTableActions = ({row, onDelete}) => {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <IconButton icon={<MinusUserIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Открепить пользователя от организации" onClick={() => onDelete(row)} />
            <IconButton icon={<InfoIcon size={20} color={`rgba(var(--alert-info-color), 1)`} />} title="Информация о пользователе" onClick={() => navigate(`/users/info/${row?.user?.kk_user_id}`)} />
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/users/action/edit/${row?.user?.kk_user_id}`)} />
        </React.Fragment>
    )
}


const OrganizationsUsersTable: FunctionComponent<OrganizationsUsersTableProps> = ({
    onDelete,
    columns = [
        {
            Header: 'ID',
            accessor: row => row?.user?.kk_user_id,
        },
        {
            Header: 'ФИО',
            accessor: row => `${row?.user?.kk_user_lastname} ${row?.user?.kk_user_firstname}`,
        },
        {
            Header: 'Роль',
            accessor: row => row?.user?.role?.kk_role_name,
        },
        {
            Header: 'Действия',
            accessor: row => <OrganizationsUsersTableActions row={row} onDelete={onDelete} />,
        },
    ],
    data,
}): JSX.Element => {
    const memoried_columns = React.useMemo(() => columns, [])
    return <Table columns={memoried_columns} data={data} />;
}

function mapStateToProps(state) {
    const {
        delete_organization_users_loading,
        delete_organization_users_message,
        delete_organization_users_error,
        delete_organization_users,
    } = state.organizations_users;

    return {
        delete_organization_users_loading,
        delete_organization_users_message,
        delete_organization_users_error,
        delete_organization_users,
    };
}

const connectedOrganizationsUsersTable = connect(mapStateToProps)(OrganizationsUsersTable);
export { connectedOrganizationsUsersTable as OrganizationsUsersTable };