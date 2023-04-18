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
import { NoMatchPage } from "../..";
import moment from 'moment';
import 'moment/dist/locale/ru';


type CoursesConstructorLessonQuestionEditorProps = {
    dispatch: any;
    user: User;
    kk_lesson_id: string;
    question: any;


    question_editor_action: string | null,
    question_editor_question: object | null,

    add_questions_loading: boolean;
    add_questions_message: string | null,
    add_questions_errors: Array<any> | null,
    add_questions_error_message: string | null,
    add_questions: object | null,

    edit_questions_loading: boolean,
    edit_questions_message: string | null,
    edit_questions_errors: Array<any> | null,
    edit_questions_error_message: string | null,
    edit_questions: object | null,

    get_all_by_lesson_id_questions_loading: boolean,
    get_all_by_lesson_id_questions_message: string | null,
    get_all_by_lesson_id_questions_error: string | null,
    get_all_by_lesson_id_questions: Array<object> | null,
}

const CoursesConstructorLessonQuestionEditor: FunctionComponent<CoursesConstructorLessonQuestionEditorProps> = ({
    dispatch,
    user,
    kk_lesson_id,
    question,

    question_editor_action,
    question_editor_question,

    add_questions_loading,
    add_questions_message,
    add_questions_errors,
    add_questions_error_message,
    add_questions,

    edit_questions_loading,
    edit_questions_message,
    edit_questions_errors,
    edit_questions_error_message,
    edit_questions,

    get_all_by_lesson_id_questions_loading,
    get_all_by_lesson_id_questions_message,
    get_all_by_lesson_id_questions_error,
    get_all_by_lesson_id_questions,
}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const initialAnswer = {
        kk_qa_text: '',
        kk_qa_correct: 0,
    }

    const { register, handleSubmit, reset, formState: { errors }, setValue, getValues, control } = useForm();
    const { fields, append, prepend, replace, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "answers", // unique name for your Field Array
    });

    useEffect(() => {
        remove(0);
        if (question?.answers && question.answers.length > 0) {
            question.answers.map((a) => append(a))
        }
    }, [])

    const changeQuestionType = (event) => {
        let kk_question_type = event.target.value;
        setValue(`kk_question_type`, kk_question_type);
        if (kk_question_type === 'text') setValue(`answers`, [initialAnswer]);
        else replace(fields.map((a, i) => ({ ...a, kk_qa_correct: 0 })));
    }

    const addNewAnswer = (answer) => append(answer)
    const removeNewAnswer = (index) => remove(index);

    const changeCurrectAnswer = (index) => {
        const kk_question_type = getValues('kk_question_type');
        const kk_qa_correct = getValues(`answers.${index}.kk_qa_correct`);
        const f = getValues(`answers`);
        switch (kk_question_type) {
            case 'radio':
                replace(f.map((a, i) => i === index ? { ...a, kk_qa_correct: 1 } : { ...a, kk_qa_correct: 0 }))
                break;
            case 'checkbox':
                replace(f.map((a, i) => i === index ? { ...a, kk_qa_correct: kk_qa_correct === 1 ? 0 : 1 } : a))
                break;
        }
    }

    const actionQuestionSubmit = async (data) => {
        if (question_editor_action === 'add') await dispatch(questionsActions.add({ ...data, kk_question_text: data.kk_question_text.split('\n').join('<br>') }));
        else if (question_editor_action === 'edit') await dispatch(questionsActions.edit({ ...data, kk_question_text: data.kk_question_text.split('\n').join('<br>') }));
    }




    return (
        <React.Fragment>
            <Form className={`courses_constructor_question_editor_from`} onSubmit={handleSubmit(actionQuestionSubmit)}>
                {question_editor_action === 'add' && <h3 className={`courses_constructor_question_editor_from_title`}>Добавить вопрос</h3>}
                {question_editor_action === 'edit' && <TextInput
                    {...register('kk_question_id')}
                    type={`hidden`}
                    id={`kk_question_id`}
                    name={`kk_question_id`}
                    defaultValue={question?.kk_question_id}
                />}
                <div className={`courses_constructor_question_editor_from_container`}>
                    <TextInput
                        {...register('kk_question_lesson_id')}
                        type={`hidden`}
                        id={`kk_question_lesson_id`}
                        name={`kk_question_lesson_id`}
                        defaultValue={kk_lesson_id}
                    />
                    <div className="mb-3">
                        <Label htmlFor="kk_question_text">Текст вопроса:</Label>
                        <TextArea
                            {...register('kk_question_text')}
                            className={`courses_constructor_page_input`}
                            id={`kk_question_text`}
                            name={`kk_question_text`}
                            placeholder={`Введите текст вопроса...`}
                        >
                            {question_editor_action === 'edit' ? question?.kk_question_text.split('<br>').join('\n') : null}
                        </TextArea>
                        {/* <TextInput
                            {...register('kk_question_text')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_question_text`}
                            name={`kk_question_text`}
                            placeholder={`Введите текст вопроса...`}
                            defaultValue={question_editor_action === 'edit' ? question?.kk_question_text : null}
                        /> */}
                        {question_editor_action === 'add' && <InputError errors={add_questions_errors} name={'kk_question_text'} />}
                        {question_editor_action === 'edit' && <InputError errors={edit_questions_errors} name={'kk_question_text'} />}
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="kk_question_type">Тип ответа:</Label>
                        <Select
                            {...register('kk_question_type')}
                            className={`courses_constructor_page_input`}
                            id={`kk_question_type`}
                            name={`kk_question_type`}
                            defaultValue={question?.kk_question_type}
                            onChange={(event) => changeQuestionType(event)}
                        >
                            <option disabled value={''}>Выберите тип ответа...</option>
                            <option value={'radio'} >{'Один верный ответ'}</option>
                            <option value={'checkbox'} >{'Несколько верных ответов'}</option>
                            <option value={'text'} >{'Текстовый ответ'}</option>
                        </Select>
                        {question_editor_action === 'add' && <InputError errors={add_questions_errors} name={'kk_question_type'} />}
                        {question_editor_action === 'edit' && <InputError errors={edit_questions_errors} name={'kk_question_type'} />}
                    </div>
                    {getValues('kk_question_type') !== 'text' ? (
                        <div>
                            <Label>Ответы:</Label>
                            {fields.map((answer, index) => (
                                <div className="mb-3" key={answer.id}>
                                    <Label htmlFor="kk_qa_text">Текст ответа {index + 1}:</Label>
                                    <InputGroup>
                                        <TextInput
                                            {...register(`answers.${index}.kk_qa_text`)}
                                            className={`courses_constructor_page_input`}
                                            type={`text`}
                                            placeholder={`Введите текст ответа...`}
                                            defaultValue={question_editor_action === 'edit' ? question?.kk_qa_text : null}
                                        />
                                        <InputGroupText className={`courses_constructor_page_input_group_text`} style={{ width: '120px' }}>
                                            <IconButton
                                                style={{ width: '100%', textAlign: 'center' }}
                                                icon={answer.kk_qa_correct === 1 ? <b className={'text-success'}>{'Верный'}</b> : <b className={'text-danger'}>{'Неверный'}</b>}
                                                onClick={() => changeCurrectAnswer(index)}
                                            />
                                        </InputGroupText>
                                        <InputGroupText className={`courses_constructor_page_input_group_text`}>
                                            <IconButton icon={<TrashIcon size={20} />} onClick={() => removeNewAnswer(index)} />
                                        </InputGroupText>
                                    </InputGroup>
                                    {question_editor_action === 'add' && <InputError errors={add_questions_errors} name={`answers.${index}.kk_qa_text`} />}
                                    {question_editor_action === 'edit' && <InputError errors={edit_questions_errors} name={`answers.${index}.kk_qa_text`} />}
                                </div>
                            ))}
                            <Button className="w-100" onClick={() => addNewAnswer(initialAnswer)}>+</Button>
                        </div>
                    ) : (
                        <React.Fragment>
                            <TextInput {...register(`answers.0.kk_qa_text`)} type={`hidden`} value={'Текстовый ответ'} />
                            <TextInput {...register(`answers.0.kk_qa_correct`)} type={`hidden`} value={1} />
                        </React.Fragment>
                    )}


                </div>
                <div className={`courses_constructor_question_editor_from_actions`}>
                    {add_questions_message && <Alert type={'success'} message={add_questions_message} />}
                    {add_questions_error_message && <Alert type={'danger'} message={add_questions_error_message} />}

                    {edit_questions_message && <Alert type={'success'} message={edit_questions_message} />}
                    {edit_questions_error_message && <Alert type={'danger'} message={edit_questions_error_message} />}

                    <Button color={`primary`} type="submit" loading={add_questions_loading || edit_questions_loading} disabled={add_questions_loading || edit_questions_loading}>Сохранить</Button>
                    <Button onClick={() => dispatch(questionsActions.setQuestionEditor(null, null))}>Отмена</Button>
                </div>
            </Form>
        </React.Fragment>

    );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        question_editor_action,
        question_editor_question,

        add_questions_loading,
        add_questions_message,
        add_questions_errors,
        add_questions_error_message,
        add_questions,

        edit_questions_loading,
        edit_questions_message,
        edit_questions_errors,
        edit_questions_error_message,
        edit_questions,

        get_all_by_lesson_id_questions_loading,
        get_all_by_lesson_id_questions_message,
        get_all_by_lesson_id_questions_error,
        get_all_by_lesson_id_questions,
    } = state.questions;

    return {
        user,
        question_editor_action,
        question_editor_question,

        add_questions_loading,
        add_questions_message,
        add_questions_errors,
        add_questions_error_message,
        add_questions,

        edit_questions_loading,
        edit_questions_message,
        edit_questions_errors,
        edit_questions_error_message,
        edit_questions,

        get_all_by_lesson_id_questions_loading,
        get_all_by_lesson_id_questions_message,
        get_all_by_lesson_id_questions_error,
        get_all_by_lesson_id_questions,
    };
}
const connectedCoursesConstructorLessonQuestionEditor = connect(mapStateToProps)(CoursesConstructorLessonQuestionEditor);
export { connectedCoursesConstructorLessonQuestionEditor as CoursesConstructorLessonQuestionEditor };