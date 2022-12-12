import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import {Button, TabsMenu } from '../../../_components/UI';
import { PageLoader,} from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';
import { MyUsersTable } from "../..";

type MyUsersModuleProps = { dispatch: any; user: User; user_page_tab_table: number; }

const MyUsersModule: FunctionComponent<MyUsersModuleProps> = ({ dispatch, user, user_page_tab_table }): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => setLoading(false)
        init();
    }, []);


    if (loading) return <PageLoader />
    return (
        <div className={`users_page_module`}>
            <MyUsersTable kk_user_role_id={user_page_tab_table} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab_table } = state.users;
    return {user, user_page_tab_table};
}
const connectedMyUsersModule = connect(mapStateToProps)(MyUsersModule);
export { connectedMyUsersModule as MyUsersModule };

