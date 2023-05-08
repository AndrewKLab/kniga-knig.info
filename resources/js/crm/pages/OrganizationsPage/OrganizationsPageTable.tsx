import React, { FunctionComponent, useEffect, useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Table } from "../../_components/UI";
import { IconButton } from "../../../public/_components/UI";
import { PenIcon, TrashIcon } from "../../_components/UI/Icons";

export const OrganizationsPageTableActions: FunctionComponent = ({ item, openRemoveModal }) => {
    let navigate = useNavigate();
    return (
        <div>
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/organizations/action/update/${item.kk_organization_id}`)} />
            <IconButton icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Удалить" onClick={() => openRemoveModal(item) } />
        </div>
    )
}

type OrganizationsPageTableProps = {
    openRemoveModal:any;
    columns: [];
    data: [];
}

export const OrganizationsPageTable: FunctionComponent<OrganizationsPageTableProps> = ({
    openRemoveModal,
    columns = [
        {
            Header: 'ID',
            accessor: 'kk_organization_id',
        },
        {
            Header: 'Тип организации',
            accessor: row => row?.type?.kk_ot_name,
        },
        {
            Header: 'Название',
            accessor: 'kk_organization_name',
        },

        {
            Header: 'Родительская организация',
            accessor: row => row?.parrent?.kk_organization_name,
        },
        {
            Header: 'Действия',
            accessor: row => <OrganizationsPageTableActions item={row} openRemoveModal={openRemoveModal}  />
        },
        {
            Header: 'Дата обновления',
            accessor: row => moment(row.kk_organization_updated_at).format('DD.MM.YYYY HH:mm'),
        },
    ],
    data,
}): JSX.Element => {
    let navigate = useNavigate();
    const memoried_columns = React.useMemo(() => columns, [])

    return <Table columns={memoried_columns} data={data} />;
}