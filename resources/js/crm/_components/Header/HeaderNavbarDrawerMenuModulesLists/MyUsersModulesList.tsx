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


    if (loading) return <PartLoader />
    return (
        <div className={`header_navbar_drawer_modules_list`}>
            <TabsMenu activeTab={user_page_tab_table} setActiveTab={(table)=>dispatch(usersActions.setUsersPageTabTable(table))} tabs={[
                { key: 2, menuTitle: `Мои Администраторы` },
                { key: 3, menuTitle: `Мои Координаторы` },
                { key: 8, menuTitle: `Мои Пасторы` },
                { key: 4, menuTitle: `Мои Учителя` },
                { key: 5, menuTitle: `Мои Промоутеры` },
                { key: 6, menuTitle: `Мои Ученики` },
                { key: 7, menuTitle: `Мои Искатели` },
            ]} />
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

