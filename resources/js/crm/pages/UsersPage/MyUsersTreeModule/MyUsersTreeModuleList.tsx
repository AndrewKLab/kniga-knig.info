import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { MyUsersTreeModuleListItem } from "./MyUsersTreeModuleListItem";

type MyUsersTreeModuleListProps = {
    user: object | null;
}

const MyUsersTreeModuleList: FunctionComponent<MyUsersTreeModuleListProps> = ({ user }): JSX.Element => {
    return (
        <div className="my_users_tree_module_list">
            <div className="my_users_tree_module_list_title">{user?.kk_user_lastname} {user?.kk_user_firstname}</div>
            {user?.admin && <MyUsersTreeModuleListItem title={`Администратор`} user={user.admin} />}
            {user?.coordinator && <MyUsersTreeModuleListItem title={`Координатор`} user={user.coordinator} />}
            {user?.pastor && <MyUsersTreeModuleListItem title={`Пастор`} user={user.pastor} />}
            {user?.teather && <MyUsersTreeModuleListItem title={`Учитель`} user={user.teather} />}
            {user?.promouter && <MyUsersTreeModuleListItem title={`Промоутер`} user={user.promouter} />}
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
const connectedMyUsersTreeModuleList = connect(mapStateToPropsMyUsersTreeModuleListItem)(MyUsersTreeModuleList);
export { connectedMyUsersTreeModuleList as MyUsersTreeModuleList };