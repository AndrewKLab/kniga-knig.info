import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";

export interface RemoveCourseModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    course: object | null;
    onDelete: any;

    remove_courses_loading: boolean,
    remove_courses_message: string | null,
    remove_courses_error: string | null,
    remove_courses: any,
}

const RemoveCourseModal: FunctionComponent<RemoveCourseModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    course,
    onDelete,

    remove_courses_loading,
    remove_courses_message,
    remove_courses_error,
    remove_courses,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить курс</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить курс {`"${course?.kk_course_name}"`}? Вместе с ним будут удалены все уроки в этом курсе.
            </ModalBody>
            <ModalActions>
                <Button color={'primary'} onClick={onDelete} loading={remove_courses_loading} disabled={remove_courses_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        remove_courses_loading,
        remove_courses_message,
        remove_courses_error,
        remove_courses,
    } = state.courses;
    return {
        remove_courses_loading,
        remove_courses_message,
        remove_courses_error,
        remove_courses,
    };
}
const connectedRemoveCourseModal = connect(mapStateToProps)(RemoveCourseModal);
export { connectedRemoveCourseModal as RemoveCourseModal };