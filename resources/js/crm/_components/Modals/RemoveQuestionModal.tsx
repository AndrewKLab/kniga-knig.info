import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalActions, ModalBody, ModalHeader } from "../UI";
import parse from 'html-react-parser';

export interface RemoveQuestionModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    question: object | null;
    onDelete: any;

    remove_questions_loading: boolean,
    remove_questions_message: string | null,
    remove_questions_error: string | null,
    remove_questions: any,
}

const RemoveQuestionModal: FunctionComponent<RemoveQuestionModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    question,
    onDelete,

    remove_questions_loading,
    remove_questions_message,
    remove_questions_error,
    remove_questions,
    ...other
}) => {

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Удалить вопрос</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить вопрос "{parse(question?.kk_question_text)}"? Вместе с ним будут удалены все ответы и ответы пользователей связанные с этим вопросом.
            </ModalBody>
            <ModalActions>
                <Button color={'primary'} onClick={onDelete} loading={remove_questions_loading} disabled={remove_questions_loading}>Удалить</Button>
                <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
            </ModalActions>
        </Modal> : null
} 

function mapStateToProps(state) {
    const {
        remove_questions_loading,
        remove_questions_message,
        remove_questions_error,
        remove_questions,
    } = state.questions;
    return {
        remove_questions_loading,
        remove_questions_message,
        remove_questions_error,
        remove_questions,
    };
}
const connectedRemoveQuestionModal = connect(mapStateToProps)(RemoveQuestionModal);
export { connectedRemoveQuestionModal as RemoveQuestionModal };