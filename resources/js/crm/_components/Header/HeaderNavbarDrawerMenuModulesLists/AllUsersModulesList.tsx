import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, TabsMenu } from '../../../_components/UI';
import { PageLoader, PartLoader, } from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';
import { settingsActions, usersActions } from "../../../_actions";

type AllUsersModulesListProps = { 
    dispatch: any; 
    user: User; 
    get_all_users_roles_loading: boolean;
    get_all_users_roles_message: string|null;
    get_all_users_roles_error: string|null;
    get_all_users_roles: object[];

    user_page_tab_table: number;
}

const AllUsersModulesList: FunctionComponent<AllUsersModulesListProps> = ({ 
    dispatch, 
    user,
    get_all_users_roles_loading,
    get_all_users_roles_message,
    get_all_users_roles_error,
    get_all_users_roles,

    user_page_tab_table

}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await dispatch(settingsActions.getAllUsersRoles())
            setLoading(false)
        }
        init();
    }, []);


    if (loading || get_all_users_roles_loading) return <PartLoader />
    return (
        <div className={`header_navbar_drawer_modules_list`}>
            <TabsMenu activeTab={user_page_tab_table} setActiveTab={(table)=>dispatch(usersActions.setUsersPageTabTable(table))} tabs={get_all_users_roles && get_all_users_roles.length > 0 ? get_all_users_roles.map((role, index) => { return { key: role.kk_role_id, menuTitle: role.kk_role_name } }) : []} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab_table } = state.users;
    const {
        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,
    } = state.settings
    return {
        user,
        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,

        user_page_tab_table
    };
}
const connectedAllUsersModulesList = connect(mapStateToProps)(AllUsersModulesList);
export { connectedAllUsersModulesList as AllUsersModulesList };

