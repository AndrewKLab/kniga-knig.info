import moment from "moment";
import React, { FunctionComponent} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../_helpers";
import { Button, Col, Modal, ModalActions, ModalBody, ModalHeader, Row, Share } from "../../../public/_components/UI";

export interface FinishLessonModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
    lesson: object | null;
    nextLesson?: any;
    onEdit?: any;
    kk_course_id?: string;

    remove_lessons_users_progress_loading: boolean,
    remove_lessons_users_progress_message: string | null,
    remove_lessons_users_progress_error: string | null,
    remove_lessons_users_progress: any,
}

const FinishLessonModal: FunctionComponent<FinishLessonModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    lesson,
    nextLesson,
    onEdit,
    kk_course_id,

    remove_lessons_users_progress_loading,
    remove_lessons_users_progress_message,
    remove_lessons_users_progress_error,
    remove_lessons_users_progress,
    ...other
}) => {
    let navigate = useNavigate();
    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}>Урок пройден</ModalHeader>
            <ModalBody>
            Дата и время прохождения: {moment(lesson?.kk_lup_finished_at).locale('ru').format('Do MMMM YYYY, hh:mm')}
            </ModalBody>
            <ModalActions>
                <Row g={3}>

                    <Col xs={12} lg={6}><Button className="w-100" onClick={nextLesson}>Начать следующий урок</Button></Col>
                    <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/`)}>Завершить занятие</Button></Col>
                    <Col xs={12} lg={6}><Button className="w-100" color={'primary'} onClick={onEdit} loading={remove_lessons_users_progress_loading} disabled={remove_lessons_users_progress_loading}>Повторить тест</Button></Col>
                    <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/contacts`)}>Задать вопрос</Button></Col>
                    <Col xs={12} lg={12}><Button className="w-100" onClick={() => navigate(`/`)}>Поддержать сайт</Button></Col>
                    <Col xs={12} lg={12}>Поделиться:</Col>
                    <Col xs={12} lg={12}><Share link={`${config.appUrl}/courses/${kk_course_id}`} whatsapp viber telegram sms copy/></Col>

                </Row>
            </ModalActions>
        </Modal> : null
}

function mapStateToProps(state) {
    const {
        remove_lessons_users_progress_loading,
        remove_lessons_users_progress_message,
        remove_lessons_users_progress_error,
        remove_lessons_users_progress,
    } = state.lessons_users_progress;
    return {
        remove_lessons_users_progress_loading,
        remove_lessons_users_progress_message,
        remove_lessons_users_progress_error,
        remove_lessons_users_progress,
    };
}
const connectedFinishLessonModal = connect(mapStateToProps)(FinishLessonModal);
export { connectedFinishLessonModal as FinishLessonModal };