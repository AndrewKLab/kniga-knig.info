import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { Image, Button, Alert, List, Form, TextInput, IconButton } from '../../_components/UI';
import { CoursesCard, PageLoader } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions, chatsActions } from "../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import './index.css';
import { config } from "../../_helpers";
import moment from 'moment';
import { useForm } from "react-hook-form";
import { ArrowSquareRightIcon } from "../../_components/UI/Icons";
import { useWindowWidth } from "../../_hooks/useWindowWidth";

type ChatPageProps = {
    dispatch: any;
    user: User;
    get_one_by_id_chats_loading: boolean,
    get_one_by_id_chats_message: string | null,
    get_one_by_id_chats_error: string | null,
    get_one_by_id_chats: Array<any> | null,

    send_message_chats_loading: boolean,
    send_message_chats_message: string | null,
    send_message_chats_error: string | null,
}

const ChatPage: FunctionComponent<ChatPageProps> = ({
    dispatch,
    user,

    get_one_by_id_chats_loading,
    get_one_by_id_chats_message,
    get_one_by_id_chats_error,
    get_one_by_id_chats,

    send_message_chats_loading,
    send_message_chats_message,
    send_message_chats_error,


}): JSX.Element => {
    const messagesEndRef = useRef(null)
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    let { kk_chat_id } = useParams();
    const getChatUser = (chat) => {
        if (chat.user_one && chat.user_one.kk_user_id !== user.kk_user_id) return chat.user_one;
        else if (chat.user_two && chat.user_two.kk_user_id !== user.kk_user_id) return chat.user_two;
        else return null;
    }
    const width = useWindowWidth();
    let chat_user = get_one_by_id_chats ? getChatUser(get_one_by_id_chats) : null;
    const header = document.getElementById('header')
    const footer = document.getElementById('footer')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const init = async () => {
            await dispatch(chatsActions.getOneById({ parts: 'user_one,user_two,messages', kk_chat_id: kk_chat_id }));
            setLoading(false)
            scrollToBottom()
        }
        init();

    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({})
    }

    const sendMessageToChat = async (data) => {
        if (data.kk_cm_message) {
            await dispatch(chatsActions.sendMessage({ kk_cm_chat_id: kk_chat_id, kk_cm_send_to_user_id: chat_user.kk_user_id, kk_cm_message: data.kk_cm_message }))
            reset();
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }



    if (loading || get_one_by_id_chats_loading) return <PageLoader />
    return (
        <div className={`chat_page`} style={{ height: `calc(100vh - ${width >= 1200 ? 230 : 60}px - ${header?.offsetHeight}px - ${footer?.offsetHeight}px)` }}>
            <div className={`chat_page_header`}>
                <Image className={`chats_page_user_avatar`} src={`${config.images.avatars}/${chat_user.kk_user_avatar ? chat_user.kk_user_avatar : config.defaultUserAvatar}`} />
                <h3 className={`chat_page_header_user_name`}>{`${chat_user.kk_user_lastname} ${chat_user.kk_user_firstname}`}</h3>
            </div>
            <div className={`chat_page_container`}>
                {get_one_by_id_chats.messages && get_one_by_id_chats.messages.length > 0 && get_one_by_id_chats.messages.map((message, index) => {
                    return (
                        <div key={message.kk_cm_id} className={`chat_message${user.kk_user_id === message.kk_cm_send_from_user_id ? ` from` : ` to`}`}>
                            <div className={`chat_message_item`}>
                                {message.kk_cm_message}
                                <span className={`chat_message_item_time`}>{moment(message.kk_cm_created_at).format('H:mm')}</span>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
            <Form className={`chat_page_actions`} onSubmit={handleSubmit(sendMessageToChat)}>
                <TextInput
                    {...register('kk_cm_message')}
                    className={`chat_page_actions_input`}
                    id={`kk_cm_message`}
                    name={`kk_cm_message`}
                    placeholder={`Введите ваше сообщение...`}
                />
                <IconButton type="submit" icon={<ArrowSquareRightIcon />} disabled={send_message_chats_loading} />
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;

    const {
        get_one_by_id_chats_loading,
        get_one_by_id_chats_message,
        get_one_by_id_chats_error,
        get_one_by_id_chats,

        send_message_chats_loading,
        send_message_chats_message,
        send_message_chats_error,
    } = state.chats;
    return {
        user,
        get_one_by_id_chats_loading,
        get_one_by_id_chats_message,
        get_one_by_id_chats_error,
        get_one_by_id_chats,

        send_message_chats_loading,
        send_message_chats_message,
        send_message_chats_error,
    };
}
const connectedChatPage = connect(mapStateToProps)(ChatPage);
export { connectedChatPage as ChatPage };