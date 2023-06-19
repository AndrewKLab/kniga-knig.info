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


type UsersOrganizationsTableProps = {
    columns: [];
    data: [];
    onDelete: any;
}

const UsersOrganizationsTableActions = ({row, onDelete}) => {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <IconButton icon={<MinusUserIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Открепить пользователя от организации" onClick={() => onDelete(row)} />
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/organizations/action/update/${row?.organization?.kk_organization_id}`)} />
        </React.Fragment>
    )
}


const UsersOrganizationsTable: FunctionComponent<UsersOrganizationsTableProps> = ({
    onDelete,
    columns = [
        {
            Header: 'ID',
            accessor: row => row?.organization?.kk_organization_id,
        },
        {
            Header: 'Тип',
            accessor: row => `${row?.organization?.type.kk_ot_name}`,
        },
        {
            Header: 'Название',
            accessor: row => `${row?.organization?.kk_organization_name}`,
        },
        {
            Header: 'Действия',
            accessor: row => <UsersOrganizationsTableActions row={row} onDelete={onDelete} />,
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

const connectedUsersOrganizationsTable = connect(mapStateToProps)(UsersOrganizationsTable);
export { connectedUsersOrganizationsTable as UsersOrganizationsTable };