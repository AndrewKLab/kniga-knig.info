import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Organization, User } from '../../../public/_interfaces';
import './index.css';
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { PageLoader, PartLoader } from "../../../public/_components";
import { users_reviewsActions } from "../../_actions/users_reviews.actions";
import { UsersReviewsPageTable } from "./UsersReviewsPageTable";
import { PageAlert, RemoveOrganizationModal } from "../../_components";
import { Button } from "../../../public/_components/UI";
import { usersReviewsActions } from "../../../public/_actions";
import { UsersReviewsList } from "./UsersReviewsList";


type UsersReviewsPageProps = {
    dispatch: any;

    get_all_users_reviews_loading: boolean,
    get_all_users_reviews_message: null | string,
    get_all_users_reviews_error: null | string,
    get_all_users_reviews: null | [],
}

const UsersReviewsPage: FunctionComponent<UsersReviewsPageProps> = ({
    dispatch,

    get_all_users_reviews_loading,
    get_all_users_reviews_message,
    get_all_users_reviews_error,
    get_all_users_reviews,
}): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            if (!get_all_users_reviews_loading) await dispatch(usersReviewsActions.getAll({ parts: `user,lesson,course` }));
        }
        init();
    }, []);

    if (get_all_users_reviews_loading) return <PageLoader />
    if (get_all_users_reviews_error) return <PageAlert type={'danger'} message={get_all_users_reviews_error}/>
    return (
        <div className={`users_reviews_page`}>
            <UsersReviewsList data={get_all_users_reviews}/>

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
const connectedUsersReviewsPage = connect(mapStateToProps)(UsersReviewsPage);
export { connectedUsersReviewsPage as UsersReviewsPage };