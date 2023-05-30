import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Organization, User } from '../../../public/_interfaces';
import './index.css';
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { PageLoader, PartLoader } from "../../../public/_components";
import { PageAlert, PartAlert, RemoveOrganizationModal, RemoveUserReviewModal } from "../../_components";
import { Button } from "../../../public/_components/UI";
import { usersReviewsActions } from "../../../public/_actions";
import { UsersReviewsListItem } from "./UsersReviewsListItem";


type UsersReviewsListProps = {
    dispatch: any;

    data?: [] | null
}

const UsersReviewsList: FunctionComponent<UsersReviewsListProps> = ({
    dispatch,
    data,
}): JSX.Element => {
    let navigate = useNavigate();
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [selectedToModal, setSelectedToModal] = useState(false);

    useEffect(() => {

    }, []);

    const openRemoveModal = (item) => {
        setIsOpenRemoveModal(true)
        setSelectedToModal(item)
    }

    const onDelete = async () => {
        const remove = await dispatch(usersReviewsActions.remove({ kk_ur_id: selectedToModal?.kk_ur_id }))
        if (remove?.res) {
            setIsOpenRemoveModal(false);
            setSelectedToModal(null);
        }
    }

    return (
        <div className={`users_reviews_list`}>
            {data ? (
                data.map((item, index) => <UsersReviewsListItem key={item.kk_ur_id} item={item} openRemoveModal={openRemoveModal} />)
            ) : <PartAlert type={`danger`} message={'Список отзывов пуст!'} />}
            <RemoveUserReviewModal
                isOpen={isOpenRemoveModal}
                setIsOpen={setIsOpenRemoveModal}
                item={selectedToModal}
                onDelete={onDelete}
            />
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
const connectedUsersReviewsList = connect(mapStateToProps)(UsersReviewsList);
export { connectedUsersReviewsList as UsersReviewsList };