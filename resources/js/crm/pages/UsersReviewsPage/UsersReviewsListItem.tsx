import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import './index.css';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IconButton, Image } from "../../../public/_components/UI";
import { config } from "../../_helpers";
import { StarIcon } from "../../../public/_components/UI/Icons";
import { PenIcon, TrashIcon } from "../../_components/UI/Icons";

type UsersReviewsListItemProps = {
    dispatch: any;
    item?: [] | null;
    openRemoveModal: any;
}

const UsersReviewsListItem: FunctionComponent<UsersReviewsListItemProps> = ({
    dispatch,
    item,
    openRemoveModal,
}): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {

    }, []);

    const stars = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },];

    return (
        <div className={`users_reviews_list_item`}>
            <Image className={`users_reviews_list_item_image`} src={`${config.images.avatars}/${item.user.kk_user_avatar ? item.user.kk_user_avatar : config.defaultUserAvatar}`} />
            <div className={`w-100`}>
                <div className={`users_reviews_list_item_header`}>
                    <b>{item.user.kk_user_lastname} {item.user.kk_user_firstname}</b>
                    <span>{moment(item.kk_ur_created_at).format('DD.MM.YYYY hh:mm')}</span>
                </div>
                <div className={`users_reviews_list_item_description`}>
                    <span>{item.user.role.kk_role_name}</span>
                    <div>
                        <IconButton icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Удалить" onClick={() => openRemoveModal(item)} />
                    </div>
                </div>
                <div className={`users_reviews_list_item_stars`}>
                    {stars.map((star, index) => <StarIcon key={star.value} size={18} color={star.value <= item.kk_ur_assessment ? '#fbb201' : '#e7e7e7'} />)}
                </div>
                {item.course && <div className={`users_reviews_list_item_text`}><b>Отзыв на курс:</b> {item.course.kk_course_name}</div>}
                {item.lesson && <div className={`users_reviews_list_item_text`}><b>Отзыв на урок:</b> #{item.lesson.kk_lesson_number} {item.lesson.kk_lesson_name} | {item?.lesson?.course?.kk_course_name}</div>}
                {item.kk_ur_text && <div className={`users_reviews_list_item_text`}>{item.kk_ur_text}</div>}
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    const {
        get_all_users_reviews_loading,
        get_all_users_reviews_message,
        get_all_users_reviews_error,
        get_all_users_reviews,
    } = state.users_reviews;
    return {

        get_all_users_reviews_loading,
        get_all_users_reviews_message,
        get_all_users_reviews_error,
        get_all_users_reviews,
    };
}
const connectedUsersReviewsListItem = connect(mapStateToProps)(UsersReviewsListItem);
export { connectedUsersReviewsListItem as UsersReviewsListItem };