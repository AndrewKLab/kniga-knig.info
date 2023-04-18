import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import { Lesson } from "../../../public/_interfaces";
import "./index.css";
import { lessonsActions } from "../../_actions";

export interface PromptLessonSaveModalProps extends React.HTMLAttributes<HTMLDivElement> {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    edit_lessons_loading: boolean;
    lesson_editor_is_lesson_edit_open_modal: boolean;
    lesson: Lesson | null;
}

const PromptLessonSaveModal: FunctionComponent<PromptLessonSaveModalProps> = ({
    dispatch,
    children,
    className,

    edit_lessons_loading,
    lesson_editor_is_lesson_edit_open_modal,
    lesson,
    ...other
}) => {
    const setIsOpen = (open: boolean) => {
        if (!open) dispatch({ type: "IS_LESSON_EDIT", edit: false })
        dispatch({ type: "OPEN_IS_LESSON_EDIT_MODAL", open })
    }


    return lesson_editor_is_lesson_edit_open_modal ?
        <Modal centered isOpen={lesson_editor_is_lesson_edit_open_modal} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Закрыть урок</ModalHeader>
            <ModalBody>
                Вы действительно хотите закрыть урок {`"${lesson?.kk_lesson_name}"`}? Все внесенные изменения будут потеряны.
            </ModalBody>
            <ModalActions>
                <Button color={`primary`} type="submit" form="lesson_from" className={`modal_small_button`} loading={edit_lessons_loading} disabled={edit_lessons_loading}>Сохранить</Button>
                {/* <Button color={`primary`} className={`modal_small_button`} onClick={() => setIsOpen(false)}>Сохранить и выйти</Button> */}
                <Button className={`modal_small_button`} onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
}

function mapStateToProps(state) {
    const {
        edit_lessons_loading,
        lesson_editor_is_lesson_edit_open_modal,
    } = state.lessons;
    return {
        edit_lessons_loading,
        lesson_editor_is_lesson_edit_open_modal,
    };
}
const connectedPromptLessonSaveModal = connect(mapStateToProps)(PromptLessonSaveModal);
export { connectedPromptLessonSaveModal as PromptLessonSaveModal };