import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Button, TabsMenu } from '../../../_components/UI';
import { PageLoader, PartLoader,} from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import { usersActions } from "../../../_actions";

type MyUsersModulesListProps = { dispatch: any; user: User; user_page_tab_table: number; }

const MyUsersModulesList: FunctionComponent<MyUsersModulesListProps> = ({ dispatch, user, user_page_tab_table}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(6)

    useEffect(() => {
        const init = async () => setLoading(false)
        init();
    }, []);

    let tabs = [];
    if(user?.role?.kk_role_level <= 2) tabs.push({ key: 2, menuTitle: `Мои Администраторы` });
    if(user?.role?.kk_role_level < 3) tabs.push({ key: 3, menuTitle: `Мои Координаторы` });
    if(user?.role?.kk_role_level < 4) tabs.push({ key: 8, menuTitle: `Мои Пасторы` });
    if(user?.role?.kk_role_level < 5) tabs.push({ key: 4, menuTitle: `Мои Учителя` });
    if(user?.role?.kk_role_level < 6) tabs.push({ key: 5, menuTitle: `Мои Промоутеры` });
    if(user?.role?.kk_role_level < 6) tabs.push({ key: 6, menuTitle: `Мои Ученики` });
    if(user?.role?.kk_role_level < 6) tabs.push({ key: 7, menuTitle: `Мои Искатели` });


    if (loading) return <PartLoader />
    return (
        <div className={`header_navbar_drawer_modules_list`}>
            <TabsMenu activeTab={user_page_tab_table} setActiveTab={(table)=>dispatch(usersActions.setUsersPageTabTable(table))} tabs={tabs} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab_table } = state.users;
    return {user, user_page_tab_table};
}
const connectedMyUsersModulesList = connect(mapStateToProps)(MyUsersModulesList);
export { connectedMyUsersModulesList as MyUsersModulesList };

