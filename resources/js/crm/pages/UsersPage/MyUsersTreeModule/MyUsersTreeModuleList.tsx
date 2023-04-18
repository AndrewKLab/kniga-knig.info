import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { usersActions } from "../../../_actions";
import { MyUsersTreeModuleListItem } from "./MyUsersTreeModuleListItem";

type MyUsersTreeModuleListProps = {
    dispatch: any;
    user: object | null;
    get_all_users_roles: object[]
}

const MyUsersTreeModuleList: FunctionComponent<MyUsersTreeModuleListProps> = ({dispatch, user, get_all_users_roles }): JSX.Element => {
    const [showUserRoles, setShowUserRoles] = useState(false);
    const onClickUser = () => {
        dispatch(usersActions.setUserForTreeInfo(user))
        setShowUserRoles(!showUserRoles)
    }
    return (
        <div className="my_users_tree_module_list">
            <button className={`my_users_tree_module_list_item_button my_users_tree_module_list_title`} onClick={onClickUser}>{showUserRoles ? '-' : '+'} {user?.kk_user_lastname} {user?.kk_user_firstname}</button>
            <div className="my_users_tree_module_roles_list">
                {showUserRoles && get_all_users_roles && get_all_users_roles.map(role => <MyUsersTreeModuleListItem key={role.kk_role_id} user={user} role={role} />)}
            </div>
        </div>
    );
};

function mapStateToPropsMyUsersTreeModuleListItem(state) {
    const { user_for_tree_info } = state.users;
    const { get_all_users_roles } = state.settings;
    return {
        user_for_tree_info,
        get_all_users_roles
    };
}
const connectedMyUsersTreeModuleList = connect(mapStateToPropsMyUsersTreeModuleListItem)(MyUsersTreeModuleList);
export { connectedMyUsersTreeModuleList as MyUsersTreeModuleList };