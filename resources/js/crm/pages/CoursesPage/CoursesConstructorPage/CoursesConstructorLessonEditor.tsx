import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Select, Alert, List, ListItem, FileInput, Checkbox, Switch } from '../../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon } from '../../../_components/UI/Icons';

import { User } from '../../../_interfaces';
import { coursesActions, coursesCategoriesActions, lessonsActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './index.css';
import { FinishCourseButton, ImageDropzone, PageLoader, PartLoader, Question, TextEditor } from "../../../_components";
import { CoursesConstructorLessonTestEditor, NoMatchPage } from "../..";
import moment from 'moment';
import 'moment/dist/locale/ru';


type CoursesConstructorLessonEditorProps = {
    dispatch: any;
    user: User;
    kk_course_id: string;
    lesson_editor_action: string;
    lesson_editor_kk_lesson_id: string;

    add_lessons_loading: boolean;
    add_lessons_message: string | null,
    add_lessons_errors: Array<any> | null,
    add_lessons_error_message: string | null,
    add_lessons: object | null,

    edit_lessons_loading: boolean,
    edit_lessons_message: string | null,
    edit_lessons_errors: Array<any> | null,
    edit_lessons_error_message: string | null,
    edit_lessons: object | null,

    get_one_by_lesson_id_lessons_loading: boolean,
    get_one_by_lesson_id_lessons_message: string | null,
    get_one_by_lesson_id_lessons_error: string | null,
    get_one_by_lesson_id_lessons: Array<object> | null,
}

const CoursesConstructorLessonEditor: FunctionComponent<CoursesConstructorLessonEditorProps> = ({
    dispatch,
    user,
    kk_course_id,
    lesson_editor_action,
    lesson_editor_kk_lesson_id,

    add_lessons_loading,
    add_lessons_message,
    add_lessons_errors,
    add_lessons_error_message,
    add_lessons,

    edit_lessons_loading,
    edit_lessons_message,
    edit_lessons_errors,
    edit_lessons_error_message,
    edit_lessons,

    get_one_by_lesson_id_lessons_loading,
    get_one_by_lesson_id_lessons_message,
    get_one_by_lesson_id_lessons_error,
    get_one_by_lesson_id_lessons,


}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        const init = async () => {
            reset()
            if (lesson_editor_action === 'edit') await dispatch(lessonsActions.getOneByLessonId({ kk_lesson_id: lesson_editor_kk_lesson_id }))
            setLoading(false)
        }
        init();
    }, [lesson_editor_kk_lesson_id]);

    const lessonActionSubmit = async (data) => {
        if (lesson_editor_action === 'add') {
            await dispatch(lessonsActions.add(data))
        } else if (lesson_editor_action === 'edit') await dispatch(lessonsActions.edit(data))
        await dispatch(lessonsActions.getAllByCourseId({ kk_lesson_course_id: kk_course_id }))
        console.log(lesson_editor_action, data)
    }

    if (loading || get_one_by_lesson_id_lessons_loading) return <PartLoader />
    else if (lesson_editor_action === 'add' || (lesson_editor_action === 'edit' && get_one_by_lesson_id_lessons)) return (
        <div className={`courses_constructor_lessons_editor`}>
            <h2 className={`courses_constructor_lessons_editor_title`}>Урок #{get_one_by_lesson_id_lessons?.kk_lesson_number}:</h2>
            <Form id="lesson_from" onSubmit={handleSubmit(lessonActionSubmit)}>
                {lesson_editor_action === 'edit' && <TextInput
                    {...register('kk_lesson_id')}
                    type={`hidden`}
                    id={`kk_lesson_id`}
                    name={`kk_lesson_id`}
                    defaultValue={get_one_by_lesson_id_lessons?.kk_lesson_id}
                />}
                <TextInput
                    {...register('kk_lesson_course_id')}
                    type={`hidden`}
                    id={`kk_lesson_course_id`}
                    name={`kk_lesson_course_id`}
                    defaultValue={kk_course_id}
                />
                <div className="mb-3">
                    <Label htmlFor="kk_lesson_name">Название:</Label>
                    <TextInput
                        {...register('kk_lesson_name')}
                        className={`courses_constructor_page_input`}
                        type={`text`}
                        id={`kk_lesson_name`}
                        name={`kk_lesson_name`}
                        placeholder={`Введите название...`}
                        defaultValue={lesson_editor_action === 'edit' ? get_one_by_lesson_id_lessons?.kk_lesson_name : null}
                    />
                    {lesson_editor_action === 'add' && <InputError errors={add_lessons_errors} name={'kk_lesson_name'} />}
                    {lesson_editor_action === 'edit' && <InputError errors={edit_lessons_errors} name={'kk_lesson_name'} />}
                </div>
                <div className="mb-3">
                    <Label htmlFor="kk_lesson_description">Бот-приветствие:</Label>
                    <TextEditor
                        {...register('kk_lesson_description')}
                        name={'kk_lesson_description'}
                        setValue={setValue}
                        placeholder={`Введите описание...`}
                        height={300}
                        defaultValue={lesson_editor_action === 'edit' ? get_one_by_lesson_id_lessons?.kk_lesson_description : null}
                    />

                    {lesson_editor_action === 'add' && <InputError errors={add_lessons_errors} name={'kk_lesson_description'} />}
                    {lesson_editor_action === 'edit' && <InputError errors={edit_lessons_errors} name={'kk_lesson_description'} />}
                </div>
                <div className="mb-3">
                    <Label htmlFor="kk_lesson_text">Текст:</Label>
                    <TextEditor
                        {...register('kk_lesson_text')}
                        name={'kk_lesson_text'}
                        setValue={setValue}
                        placeholder={`Введите текст...`}
                        height={500}
                        defaultValue={lesson_editor_action === 'edit' ? get_one_by_lesson_id_lessons?.kk_lesson_text : null}
                    />

                    {lesson_editor_action === 'add' && <InputError errors={add_lessons_errors} name={'kk_lesson_text'} />}
                    {lesson_editor_action === 'edit' && <InputError errors={edit_lessons_errors} name={'kk_lesson_text'} />}
                </div>
                <div className="mb-3">
                    <Label htmlFor="kk_lesson_audio">Аудиоверсия:</Label>
                    <FileInput
                        {...register('kk_lesson_audio')}
                        className={`courses_constructor_page_input`}
                        id={`kk_lesson_audio`}
                        name={`kk_lesson_audio`}
                        placeholder={`Выберите аудиофаил в формате mp3...`}
                        accept={"audio/mp3"}
                        files={lesson_editor_action === 'edit' ? get_one_by_lesson_id_lessons?.kk_lesson_audio : null}
                        setValue={setValue}
                    />
                    {lesson_editor_action === 'add' && <InputError errors={add_lessons_errors} name={'kk_lesson_audio'} />}
                    {lesson_editor_action === 'edit' && <InputError errors={edit_lessons_errors} name={'kk_lesson_audio'} />}
                </div>
                <div className={`courses_constructor_lessons_editor_actions`}>
                    {lesson_editor_action === 'add' && add_lessons_error_message && <Alert message={add_lessons_error_message} type={'danger'} />}
                    {lesson_editor_action === 'edit' && edit_lessons_error_message && <Alert message={edit_lessons_error_message} type={'danger'} />}

                    {lesson_editor_action === 'add' && add_lessons_message && <Alert message={add_lessons_message} type={'success'} />}
                    {lesson_editor_action === 'edit' && edit_lessons_message && <Alert message={edit_lessons_message} type={'success'} />}

                    <Button type="submit" loading={add_lessons_loading || edit_lessons_loading} disabled={add_lessons_loading || edit_lessons_loading}>Сохранить</Button>
                </div>
            </Form>
            {lesson_editor_action === 'edit' && <CoursesConstructorLessonTestEditor kk_lesson_id={lesson_editor_kk_lesson_id}/>}
        </div >
    )
    else return <React.Fragment></React.Fragment>;
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        lesson_editor_action,
        lesson_editor_kk_lesson_id,

        add_lessons_loading,
        add_lessons_message,
        add_lessons_errors,
        add_lessons_error_message,
        add_lessons,

        edit_lessons_loading,
        edit_lessons_message,
        edit_lessons_errors,
        edit_lessons_error_message,
        edit_lessons,

        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,
    } = state.lessons;

    return {
        user,
        lesson_editor_action,
        lesson_editor_kk_lesson_id,

        add_lessons_loading,
        add_lessons_message,
        add_lessons_errors,
        add_lessons_error_message,
        add_lessons,

        edit_lessons_loading,
        edit_lessons_message,
        edit_lessons_errors,
        edit_lessons_error_message,
        edit_lessons,

        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,
    };
}
const connectedCoursesConstructorLessonEditor = connect(mapStateToProps)(CoursesConstructorLessonEditor);
export { connectedCoursesConstructorLessonEditor as CoursesConstructorLessonEditor };