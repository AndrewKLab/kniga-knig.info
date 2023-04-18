import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { pluralRoleName } from "../../../../public/_helpers";
import { usersActions } from "../../../_actions";
import { usersService } from "../../../_services";
import { MyUsersTreeModuleList } from "./";

type MyUsersTreeModuleListItemProps = {
    dispatch?: any;
    user: object;
    role: object;
}
const MyUsersTreeModuleListItem: FunctionComponent<MyUsersTreeModuleListItemProps> = ({ dispatch, user, role }): JSX.Element => {
    const [usersState, setStateUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const onClickUser = () => {
        if (!showUsers) usersService.getAllMyUsersByRoleId({ kk_user_id: user.kk_user_id, kk_user_role_id: role.kk_role_id, parts: 'admin,coordinator,pastor,teather,promouter', with_all_my_users: 1 }).then((res) => {
            if (res?.users) {
                setStateUsers(res?.users)
                setShowUsers(!showUsers)
            }
        })
        else setShowUsers(!showUsers)
    }
    return (
        <div className={`my_users_tree_module_list_item`}>
            <button className={`my_users_tree_module_list_item_button`} onClick={onClickUser}>{showUsers ? '-' : '+'} {pluralRoleName(role.kk_role_name)}</button>
            {usersState && showUsers && (usersState.length > 0 ? usersState.map(user => <MyUsersTreeModuleList key={user.kk_user_id} user={user} />) : <div className="my_users_tree_module_list_item_empty">Список пуст!</div>)}
        </div>
    );
};

function mapStateToPropsMyUsersTreeModuleListItem(state) {
    const {
        user_for_tree_info
    } = state.users;
    return {
        user_for_tree_info
    };
}
const connectedMyUsersTreeModuleListItem = connect(mapStateToPropsMyUsersTreeModuleListItem)(MyUsersTreeModuleListItem);
export { connectedMyUsersTreeModuleListItem as MyUsersTreeModuleListItem };