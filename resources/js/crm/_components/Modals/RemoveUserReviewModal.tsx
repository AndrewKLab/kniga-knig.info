import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import { Organization } from "../../../public/_interfaces";
import { Alert } from "../../../public/_components/UI";

export interface RemoveUserReviewModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    item: Organization | null;
    onDelete: any;

    delete_users_reviews_loading: boolean,
    delete_users_reviews_message: string | null,
    delete_users_reviews_error: string | null,
    delete_users_reviews: any,
}

const RemoveUserReviewModal: FunctionComponent<RemoveUserReviewModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    item,
    onDelete,

    delete_users_reviews_loading,
    delete_users_reviews_message,
    delete_users_reviews_error,
    delete_users_reviews,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить отзыв</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить отзыв.
            </ModalBody>
            <ModalActions>
                {delete_users_reviews_error && <Alert type={'danger'} message={delete_users_reviews_error}/>}
                <Button color={'primary'} onClick={onDelete} loading={delete_users_reviews_loading} disabled={delete_users_reviews_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        delete_users_reviews_loading,
        delete_users_reviews_message,
        delete_users_reviews_error,
        delete_users_reviews,
    } = state.users_reviews;
    return {
        delete_users_reviews_loading,
        delete_users_reviews_message,
        delete_users_reviews_error,
        delete_users_reviews,
    };
}
const connectedRemoveUserReviewModal = connect(mapStateToProps)(RemoveUserReviewModal);
export { connectedRemoveUserReviewModal as RemoveUserReviewModal };