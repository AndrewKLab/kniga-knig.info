import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Image, Button, Alert, List, ListItem } from '../../_components/UI';
import { CoursesCard, PageLoader } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions, chatsActions } from "../../_actions";
import { useNavigate } from "react-router-dom";
import './index.css';
import { config } from "../../_helpers";
import moment from 'moment';

type ChatsPageProps = {
    dispatch: any;
    user: User;
    get_all_by_user_chats_loading: boolean,
    get_all_by_user_chats_message: string | null,
    get_all_by_user_chats_error: string | null,
    get_all_by_user_chats: Array<any> | null,
}

const ChatsPage: FunctionComponent<ChatsPageProps> = ({
    dispatch,
    user,

    get_all_by_user_chats_loading,
    get_all_by_user_chats_message,
    get_all_by_user_chats_error,
    get_all_by_user_chats,

}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await dispatch(chatsActions.getAllByUser({ parts: 'user_one,user_two,last_message' }));
            setLoading(false)
        }
        init();
    }, []);

    const getChatUser = (chat) => {
        if (chat.user_one && chat.user_one.kk_user_id !== user.kk_user_id) return chat.user_one;
        else if (chat.user_two && chat.user_two.kk_user_id !== user.kk_user_id) return chat.user_two;
        else return null;
    }

    const openChat = (chat) => {
        navigate(`/chats/${chat.kk_chat_id}`)
    }

    if (loading || get_all_by_user_chats_loading) return <PageLoader />
    return (
        <div className={`chats_page`}>
            <h1 className={`chats_page_title`}><span className={`text-primary`}>Мои</span> диалоги:</h1>
            {get_all_by_user_chats && get_all_by_user_chats.length > 0 ? (
                <List
                    className={`chats_page_list`}
                    dataSource={get_all_by_user_chats}
                    renderItem={(chat: object, index: number) => {
                        let chat_user = getChatUser(chat);
                        if (chat_user) return (
                            <ListItem
                                className={`chats_page_list_item`}
                                key={chat.kk_chat_id}
                                itemAvatar={<Image className={`chats_page_user_avatar`} src={`${config.images.avatars}/${chat_user.kk_user_avatar ? chat_user.kk_user_avatar : config.defaultUserAvatar}`} />}
                                itemTitle={`${chat_user.kk_user_lastname} ${chat_user.kk_user_firstname}`}
                                itemDescription={chat.last_message && chat.last_message.kk_cm_message}
                                itemRightComponent={chat.last_message && moment(chat.last_message.kk_cm_created_at).fromNow()}
                                itemRightComponentClassName={`chats_page_list_item_right`}
                                onClick={() => openChat(chat)}
                            />
                        )
                    }}
                />) : (
                <Alert type={'danger'} message={'У вас пока нет ни одного диалога!'} />
            )}
            {get_all_by_user_chats_error && <Alert type={'danger'} message={get_all_by_user_chats_error} />}

        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;

    const {
        get_all_by_user_chats_loading,
        get_all_by_user_chats_message,
        get_all_by_user_chats_error,
        get_all_by_user_chats,
    } = state.chats;
    return {
        user,
        get_all_by_user_chats_loading,
        get_all_by_user_chats_message,
        get_all_by_user_chats_error,
        get_all_by_user_chats,
    };
}
const connectedChatsPage = connect(mapStateToProps)(ChatsPage);
export { connectedChatsPage as ChatsPage };