import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, TabsMenu } from '../../../_components/UI';
import { PageLoader, } from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';
import { AllUsersTable } from "./";
import { settingsActions } from "../../../_actions";

type AllUsersModuleProps = { 
    dispatch: any; 
    user: User; 
    get_all_users_roles_loading: boolean;
    get_all_users_roles_message: string|null;
    get_all_users_roles_error: string|null;
    get_all_users_roles: object[];

    user_page_tab_table: number;
}

const AllUsersModule: FunctionComponent<AllUsersModuleProps> = ({ 
    dispatch, 
    user,
    user_page_tab_table,

}): JSX.Element => {
    let navigate = useNavigate();

    return (
        <div className={`users_page_module`}>
            <AllUsersTable kk_user_role_id={user_page_tab_table} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab_table } = state.users;

    return {
        user,
        user_page_tab_table,
    };
}
const connectedAllUsersModule = connect(mapStateToProps)(AllUsersModule);
export { connectedAllUsersModule as AllUsersModule };

