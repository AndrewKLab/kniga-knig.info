import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Button, TabsMenu } from '../../../_components/UI';
import { PageLoader,} from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';
import { WithoutUsersTable } from "./";

type WithoutUsersModuleProps = { dispatch: any; user: User; user_page_tab_table: number; }

const WithoutUsersModule: FunctionComponent<WithoutUsersModuleProps> = ({ dispatch, user, user_page_tab_table }): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => setLoading(false)
        init();
    }, []);

    let tabs = [];
    if(user?.role?.kk_role_level <= 2) tabs.push({ key: 2, menuTitle: `Администратора` });
    if(user?.role?.kk_role_level <= 3) tabs.push({ key: 3, menuTitle: `Координаторы` });
    if(user?.role?.kk_role_level <= 4) tabs.push({ key: 8, menuTitle: `Пастора` });
    if(user?.role?.kk_role_level <= 5) tabs.push({ key: 4, menuTitle: `Учителя` });
    if(user?.role?.kk_role_level <= 6) tabs.push({ key: 5, menuTitle: `Промоутера` });


    if (loading) return <PageLoader />
    return (
        <div className={`users_page_module`}>
            <WithoutUsersTable kk_user_role_id={user_page_tab_table} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab_table } = state.users;
    return {user, user_page_tab_table};
}
const connectedWithoutUsersModule = connect(mapStateToProps)(WithoutUsersModule);
export { connectedWithoutUsersModule as WithoutUsersModule };

