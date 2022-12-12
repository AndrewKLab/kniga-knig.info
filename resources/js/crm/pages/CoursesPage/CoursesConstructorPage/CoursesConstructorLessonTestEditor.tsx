import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Select, Alert, List, ListItem, FileInput, Checkbox, Switch, Radio, IconButton, InputGroupText } from '../../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon, PenIcon, TrashIcon } from '../../../_components/UI/Icons';

import { User } from '../../../_interfaces';
import { coursesActions, coursesCategoriesActions, questionsActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import './index.css';
import { FinishCourseButton, ImageDropzone, PageLoader, PartLoader, Question, RemoveQuestionModal, TextEditor } from "../../../_components";
import { CoursesConstructorLessonQuestionEditor, NoMatchPage } from "../..";
import moment from 'moment';
import 'moment/dist/locale/ru';


type CoursesConstructorLessonTestEditorProps = {
    dispatch: any;
    user: User;
    kk_lesson_id: string;

    question_editor_action: string | null,
    question_editor_question: object | null,

    get_all_by_lesson_id_questions_loading: boolean,
    get_all_by_lesson_id_questions_message: string | null,
    get_all_by_lesson_id_questions_error: string | null,
    get_all_by_lesson_id_questions: Array<object> | null,
}

const CoursesConstructorLessonTestEditor: FunctionComponent<CoursesConstructorLessonTestEditorProps> = ({
    dispatch,
    user,
    kk_lesson_id,

    question_editor_action,
    question_editor_question,

    get_all_by_lesson_id_questions_loading,
    get_all_by_lesson_id_questions_message,
    get_all_by_lesson_id_questions_error,
    get_all_by_lesson_id_questions,
}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isOpenRemoveQuestionModal, setIsOpenRemoveQuestionModal] = useState(false);
    const [selectedQuestionToModal, setSelectedQuestionToModal] = useState(null);


    useEffect(() => {
        const init = async () => {
            // reset()
            await dispatch(questionsActions.getAllByLessonId({ kk_question_lesson_id: kk_lesson_id, parts: 'answers' }))
            setLoading(false)
        }
        init();
    }, []);
    const initialQuestion = {
        kk_question_lesson_id: kk_lesson_id,
        kk_question_type: 'radio',
        kk_question_text: null,
        answers: [],
    }

    const addNewQuestion = () => dispatch(questionsActions.setQuestionEditor('add', initialQuestion));

    const openDeleteQuestionModal = async (event, question) => {
        event.stopPropagation()
        setIsOpenRemoveQuestionModal(true);
        setSelectedQuestionToModal(question);
    }

    const removeQuestionSubmit = async (event, question) => {
        event.stopPropagation()
        await dispatch(questionsActions.remove({ kk_question_id: selectedQuestionToModal.kk_question_id }));
        dispatch(questionsActions.setQuestionEditor(null, null));
        await dispatch(questionsActions.getAllByLessonId({ kk_question_lesson_id: kk_lesson_id, parts: 'answers' }))

        setIsOpenRemoveQuestionModal(false);
        setSelectedQuestionToModal(null);
    }

    if (loading || get_all_by_lesson_id_questions_loading) return <PartLoader />
    else return (
        <div className={`courses_constructor_question_editor`}>
            <div className={`courses_constructor_lessons_test_editor_actions`}>
                <h2 className={`courses_constructor_question_editor_title`}>Тест:</h2>
                <Button onClick={addNewQuestion}>Добавить вопрос</Button>
            </div>
            {get_all_by_lesson_id_questions?.length === 0 && "Вопросы не найдены."}
            {get_all_by_lesson_id_questions?.length > 0 && get_all_by_lesson_id_questions?.map(question => (
                <React.Fragment key={question.kk_question_id}>
                    {question_editor_action === 'edit' && question?.kk_question_id === question_editor_question?.kk_question_id ? (
                        <CoursesConstructorLessonQuestionEditor kk_lesson_id={kk_lesson_id} question={question_editor_question} />
                    ) : (
                        <div className={``}>
                            <h5 className={`courses_constructor_question_title`}>
                                {question.kk_question_text}
                                <div className={`courses_constructor_question_title_actions`}>
                                    <IconButton icon={<PenIcon size={20} />} onClick={(event) => dispatch(questionsActions.setQuestionEditor('edit', question))} />
                                    <IconButton icon={<TrashIcon size={20} />} onClick={(event) => openDeleteQuestionModal(event, question)} />
                                </div>
                            </h5>
                            Ответы:
                            <div className={`courses_constructor_questions_answers`}>
                                {question?.answers && question?.answers.length > 0 && question?.answers?.map(answer => (
                                    <div className={`courses_constructor_questions_answer_item`}>
                                        <div className={`courses_constructor_questions_answer_title`}>
                                            {question.kk_question_type === 'checkbox' && <Checkbox disabled />}
                                            {question.kk_question_type === 'radio' && <Radio disabled />}
                                            {answer.kk_qa_text}
                                        </div>
                                        {question.kk_question_type !== 'text' ? answer.kk_qa_correct === 1 ? <b className={'text-success'}>{'Верный'}</b> : <b className={'text-danger'}>{'Неверный'}</b> : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </React.Fragment>


            ))
            }
            {question_editor_action === 'add' && <CoursesConstructorLessonQuestionEditor kk_lesson_id={kk_lesson_id} question={question_editor_question} />}
            <RemoveQuestionModal isOpen={isOpenRemoveQuestionModal} setIsOpen={setIsOpenRemoveQuestionModal} question={selectedQuestionToModal} onDelete={removeQuestionSubmit} />

        </div >
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        question_editor_action,
        question_editor_question,

        get_all_by_lesson_id_questions_loading,
        get_all_by_lesson_id_questions_message,
        get_all_by_lesson_id_questions_error,
        get_all_by_lesson_id_questions,
    } = state.questions;

    return {
        user,
        question_editor_action,
        question_editor_question,

        get_all_by_lesson_id_questions_loading,
        get_all_by_lesson_id_questions_message,
        get_all_by_lesson_id_questions_error,
        get_all_by_lesson_id_questions,
    };
}
const connectedCoursesConstructorLessonTestEditor = connect(mapStateToProps)(CoursesConstructorLessonTestEditor);
export { connectedCoursesConstructorLessonTestEditor as CoursesConstructorLessonTestEditor };