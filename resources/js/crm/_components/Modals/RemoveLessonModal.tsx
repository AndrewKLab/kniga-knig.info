import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";

export interface RemoveLessonModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    lesson: object | null;
    onDelete: any;

    remove_lessons_loading: boolean,
    remove_lessons_message: string | null,
    remove_lessons_error: string | null,
    remove_lessons: any,
}

const RemoveLessonModal: FunctionComponent<RemoveLessonModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    lesson,
    onDelete,

    remove_lessons_loading,
    remove_lessons_message,
    remove_lessons_error,
    remove_lessons,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить урок</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить урок {`"${lesson?.kk_lesson_name}"`}? Вместе с ним будут удалены все вопросы, ответы и ответы пользователей связанные с этим уроком.
            </ModalBody>
            <ModalActions>
                <Button color={'primary'} onClick={onDelete} loading={remove_lessons_loading} disabled={remove_lessons_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        remove_lessons_loading,
        remove_lessons_message,
        remove_lessons_error,
        remove_lessons,
    } = state.lessons;
    return {
        remove_lessons_loading,
        remove_lessons_message,
        remove_lessons_error,
        remove_lessons,
    };
}
const connectedRemoveLessonModal = connect(mapStateToProps)(RemoveLessonModal);
export { connectedRemoveLessonModal as RemoveLessonModal };