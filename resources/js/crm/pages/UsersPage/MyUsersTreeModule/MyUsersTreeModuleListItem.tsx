import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { usersActions } from "../../../_actions";
import { usersService } from "../../../_services";
import { MyUsersTreeModuleList } from "./";

type MyUsersTreeModuleListItemProps = {
    dispatch?: any;
    title: string;
    user: object;
}
const MyUsersTreeModuleListItem: FunctionComponent<MyUsersTreeModuleListItemProps> = ({ dispatch, title, user }): JSX.Element => {
    const [userState, setStateUser] = useState(null);
    const [showUser, setShowUser] = useState(false);
    const onClickUser = () => {
        if (!showUser) usersService.getOneByUserId({ kk_user_id: user.kk_user_id, parts: 'admin,coordinator,pastor,teather,promouter' }).then((res) => {
            if (res?.user) {
                setStateUser(res?.user)
                dispatch(usersActions.setUserForTreeInfo(res?.user))
                setShowUser(!showUser)
            }
        })
        else setShowUser(!showUser)
    }
    return (
        <div className={`my_users_tree_module_list_item`}>
            <button className={`my_users_tree_module_list_item_button`} onClick={onClickUser}>{showUser ? '-' : '+'} {title}</button>
            {showUser && <MyUsersTreeModuleList user={userState} />}
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