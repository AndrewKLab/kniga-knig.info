import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { PartLoader, RemoveUserModal } from '../../../_components';

import { User } from '../../../_interfaces';
import { usersActions } from "../../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';

import { UsersPageTable } from "../UsersPageTable";

type MyUsersTableProps = {
    dispatch: any;
    user: User;
    kk_user_role_id: number;
    get_all_my_users_by_role_id_users_loading: boolean;
    get_all_my_users_by_role_id_users_message: string | null,
    get_all_my_users_by_role_id_users_error: string | null,
    get_all_my_users_by_role_id_users: any,
}

const MyUsersTable: FunctionComponent<MyUsersTableProps> = ({
    dispatch,
    user,
    kk_user_role_id,

    get_all_my_users_by_role_id_users_loading,
    get_all_my_users_by_role_id_users_message,
    get_all_my_users_by_role_id_users_error,
    get_all_my_users_by_role_id_users,
}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isOpenRemoveUserModal, setIsOpenRemoveUserModal] = useState(false);
    const [selectedUserToModal, setSelectedUserToModal] = useState(null);


    useEffect(() => {
        const init = async () => {
            await dispatch(usersActions.getAllMyUsersByRoleId({ kk_user_role_id: kk_user_role_id }))
            setLoading(false)
        }
        init();
    }, [kk_user_role_id]);

    const onDeleteUser = async () => {
        await dispatch(usersActions.remove({ kk_user_id: selectedUserToModal?.kk_user_id }))
        await dispatch(usersActions.getAllMyUsersByRoleId({ kk_user_role_id: selectedUserToModal?.kk_user_role_id }))
        setIsOpenRemoveUserModal(false);
        setSelectedUserToModal(null);
    }

    if (loading || get_all_my_users_by_role_id_users_loading) return <PartLoader />
    return (
        <div className={`users_page_module_table`}>

            <UsersPageTable
                loading={get_all_my_users_by_role_id_users_loading}
                error_message={get_all_my_users_by_role_id_users_error}
                data={get_all_my_users_by_role_id_users}
                
                setIsOpenRemoveUserModal={setIsOpenRemoveUserModal}
                setSelectedUserToModal={setSelectedUserToModal}
            />

            <RemoveUserModal isOpen={isOpenRemoveUserModal} setIsOpen={setIsOpenRemoveUserModal} user={selectedUserToModal} onDelete={onDeleteUser} />
        </div>
    )
}

function mapStateToPropsMyUsersTable(state) {
    const { user } = state.auth;
    const {
        get_all_my_users_by_role_id_users_loading,
        get_all_my_users_by_role_id_users_message,
        get_all_my_users_by_role_id_users_error,
        get_all_my_users_by_role_id_users,
    } = state.users;
    return {
        user,

        get_all_my_users_by_role_id_users_loading,
        get_all_my_users_by_role_id_users_message,
        get_all_my_users_by_role_id_users_error,
        get_all_my_users_by_role_id_users,
    };
}
const connectedMyUsersTable = connect(mapStateToPropsMyUsersTable)(MyUsersTable);
export { connectedMyUsersTable as MyUsersTable };