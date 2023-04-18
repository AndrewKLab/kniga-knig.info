import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Select, Alert } from '../../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon } from '../../../_components/UI/Icons';

import { User } from '../../../_interfaces';
import { coursesActions, coursesCategoriesActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './index.css';
import { FinishCourseButton, ImageDropzone, PageLoader, Question, TextEditor } from "../../../_components";
import { NoMatchPage } from "../..";
import { CoursesConstructorLessonsList, CoursesConstructorLessonEditor } from './';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { PromptLessonSaveModal } from "../../../_components/Modals/PromptLessonSaveModal";
import { Lesson } from "../../../../public/_interfaces";


type CoursesConstructorPageProps = {
    dispatch: any;
    user: User;

    get_all_courses_categories_loading: boolean,
    get_all_courses_categories_message: string | null,
    get_all_courses_categories_error: string | null,
    get_all_courses_categories: Array<object> | null,

    get_one_by_course_id_courses_loading: boolean,
    get_one_by_course_id_courses_message: string | null,
    get_one_by_course_id_courses_error: string | null,
    get_one_by_course_id_courses: Array<object> | null,


    add_courses_loading: boolean;
    add_courses_message: string | null,
    add_courses_errors: Array<any> | null,
    add_courses_error_message: string | null,
    add_courses: object | null,

    edit_courses_loading: boolean,
    edit_courses_message: string | null,
    edit_courses_errors: Array<any> | null,
    edit_courses_error_message: string | null,
    edit_courses: object | null,

    edit_published_courses_loading: boolean,
    edit_published_courses_message: string | null,
    edit_published_courses_errors: Array<any> | null,
    edit_published_courses_error_message: string | null,
    edit_published_courses: object | null,

    remove_courses_loading: boolean;
    remove_courses_message: string | null,
    remove_courses_error: string | null,
    remove_courses: object | null,

    get_one_by_lesson_id_lessons: Lesson | null;
}

const CoursesConstructorPage: FunctionComponent<CoursesConstructorPageProps> = ({
    dispatch,
    user,

    get_all_courses_categories_loading,
    get_all_courses_categories_message,
    get_all_courses_categories_error,
    get_all_courses_categories,

    get_one_by_course_id_courses_loading,
    get_one_by_course_id_courses_message,
    get_one_by_course_id_courses_error,
    get_one_by_course_id_courses,

    add_courses_loading,
    add_courses_message,
    add_courses_errors,
    add_courses_error_message,
    add_courses,

    edit_courses_loading,
    edit_courses_message,
    edit_courses_errors,
    edit_courses_error_message,
    edit_courses,

    edit_published_courses_loading,
    edit_published_courses_message,
    edit_published_courses_errors,
    edit_published_courses_error_message,
    edit_published_courses,

    remove_courses_loading,
    remove_courses_message,
    remove_courses_error,
    remove_courses,

    get_one_by_lesson_id_lessons
}): JSX.Element => {
    let navigate = useNavigate();
    let { action, kk_course_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [noMatch, setNoMatch] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();



    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(coursesCategoriesActions.getAll());
            if (action === 'add') console.log(action)
            else if (action === 'edit') {
                await dispatch(coursesActions.getOneByCourseId({ kk_course_id: kk_course_id }));
            }
            else setNoMatch(true)

            setLoading(false)
        }
        init();
    }, [kk_course_id]);

    const courseActionSubmit = async (data) => {
        if (action === 'add') { await dispatch(coursesActions.add(data, navigate)) }
        else if (action === 'edit') await dispatch(coursesActions.edit(data))
        console.log(action, data)
    }

    const publishCourse = async () => await dispatch(coursesActions.editPublished({ ...get_one_by_course_id_courses, kk_course_published: 1 }));
    const unpublishCourse = async () => await dispatch(coursesActions.editPublished({ ...get_one_by_course_id_courses, kk_course_published: 0 }));


    if (noMatch) return <NoMatchPage />
    if (loading || get_all_courses_categories_loading || get_one_by_course_id_courses_loading) return <PageLoader />
    return (
        <div className={`courses_constructor_page`}>
            <h1 className={`crm_panel_page_title`}><a className={`cursor-pointer`} onClick={() => navigate(`/courses`)}>Курсы |</a>  <span>{kk_course_id ? `Изменить курс "${get_one_by_course_id_courses?.kk_course_name}"` : 'Добавить'} </span> </h1>
            <Row g={3}>
                <Col lg={9}>
                    <Form id="course_from" onSubmit={handleSubmit(courseActionSubmit)}>
                        {action === 'edit' ? (
                            <React.Fragment>
                                <TextInput
                                    {...register('kk_course_id')}
                                    type={`hidden`}
                                    id={`kk_course_id`}
                                    name={`kk_course_id`}
                                    defaultValue={get_one_by_course_id_courses?.kk_course_id}
                                />
                                <TextInput
                                    {...register('kk_course_published')}
                                    type={`hidden`}
                                    id={`kk_course_published`}
                                    name={`kk_course_published`}
                                    defaultValue={get_one_by_course_id_courses?.kk_course_published}
                                />
                            </React.Fragment>) : <React.Fragment></React.Fragment>
                        }
                        <div className="mb-3">
                            <Label htmlFor="kk_course_categoty_id">Категория:</Label>
                            <Select
                                {...register('kk_course_categoty_id')}
                                className={`courses_constructor_page_input`}
                                id={`kk_course_categoty_id`}
                                name={`kk_course_categoty_id`}
                                defaultValue={get_one_by_course_id_courses?.kk_course_categoty_id}
                            >
                                <option disabled value={''}>Выберите категорию...</option>
                                {get_all_courses_categories && get_all_courses_categories.map(courses_category =>
                                    <option
                                        key={courses_category.kk_cc_id}
                                        value={courses_category.kk_cc_id}
                                    // selected={action === 'edit' && get_one_by_course_id_courses?.kk_course_categoty_id === courses_category.kk_cc_id}
                                    >
                                        {courses_category.kk_cc_name}
                                    </option>
                                )}
                            </Select>
                            {action === 'add' && <InputError errors={add_courses_errors} name={'kk_course_categoty_id'} />}
                            {action === 'edit' && <InputError errors={edit_courses_errors} name={'kk_course_categoty_id'} />}
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="kk_course_name">Название:</Label>
                            <TextInput
                                {...register('kk_course_name')}
                                className={`courses_constructor_page_input`}
                                type={`text`}
                                id={`kk_course_name`}
                                name={`kk_course_name`}
                                placeholder={`Введите название...`}
                                defaultValue={action === 'edit' ? get_one_by_course_id_courses?.kk_course_name : null}
                            />
                            {action === 'add' && <InputError errors={add_courses_errors} name={'kk_course_name'} />}
                            {action === 'edit' && <InputError errors={edit_courses_errors} name={'kk_course_name'} />}
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="kk_course_description">Описание:</Label>
                            <TextEditor
                                {...register('kk_course_description')}
                                name={'kk_course_description'}
                                setValue={setValue}
                                placeholder={`Введите описание...`}
                                height={300}
                                defaultValue={action === 'edit' ? get_one_by_course_id_courses?.kk_course_description : null}
                            />

                            {action === 'add' && <InputError errors={add_courses_errors} name={'kk_course_description'} />}
                            {action === 'edit' && <InputError errors={edit_courses_errors} name={'kk_course_description'} />}
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="kk_course_image">Изображение:</Label>
                            <ImageDropzone {...register('kk_course_image')} setValue={setValue} defaultValue={action === 'edit' ? get_one_by_course_id_courses?.kk_course_image : null} />


                            {action === 'add' && <InputError errors={add_courses_errors} name={'kk_course_image'} />}
                            {action === 'edit' && <InputError errors={edit_courses_errors} name={'kk_course_image'} />}
                        </div>
                    </Form>
                    <div id="lesson_editor_start"></div>
                    {action === 'edit' && <CoursesConstructorLessonEditor kk_course_id={kk_course_id} />}
                </Col>
                <Col lg={3}>
                    <div className={`courses_constructor_page_lessons_list_container`}>
                        <div className={`courses_constructor_page_action_buttons`}>
                            <Button type="submit" form="course_from" loading={add_courses_loading || edit_courses_loading} disabled={add_courses_loading || edit_courses_loading}>Сохранить</Button>
                            {action === 'edit' && (user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN' || user?.role?.kk_role_type === 'ROLE_ADMIN' || user?.role?.kk_role_type === 'ROLE_COORDINATOR') &&
                                <React.Fragment>
                                    {get_one_by_course_id_courses?.kk_course_published === 1 ?
                                        <Button color={`primary`} onClick={unpublishCourse} loading={edit_published_courses_loading} disabled={edit_published_courses_loading}>Снять с публикации</Button>
                                        :
                                        <Button color={`primary`} onClick={publishCourse} loading={edit_published_courses_loading} disabled={edit_published_courses_loading}>Опубликовать</Button>
                                    }

                                    {/* <Button color={`primary`}>Копировать</Button> */}
                                </React.Fragment>
                            }
                            {action === 'add' && add_courses_error_message && <Alert message={add_courses_error_message} type={'danger'} />}
                            {action === 'edit' && edit_courses_error_message && <Alert message={edit_courses_error_message} type={'danger'} />}

                            {action === 'add' && add_courses_message && <Alert message={add_courses_message} type={'success'} />}
                            {action === 'edit' && edit_courses_message && <Alert message={edit_courses_message} type={'success'} />}
                        </div>

                        {action === 'edit' && <CoursesConstructorLessonsList kk_course_id={kk_course_id} />}
                    </div>
                </Col>
            </Row>


        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,
    } = state.courses_categories;
    const {
        add_courses_loading,
        add_courses_message,
        add_courses_errors,
        add_courses_error_message,
        add_courses,

        edit_courses_loading,
        edit_courses_message,
        edit_courses_errors,
        edit_courses_error_message,
        edit_courses,

        edit_published_courses_loading,
        edit_published_courses_message,
        edit_published_courses_errors,
        edit_published_courses_error_message,
        edit_published_courses,

        remove_courses_loading,
        remove_courses_message,
        remove_courses_error,
        remove_courses,

        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,

    } = state.courses;
    const { get_one_by_lesson_id_lessons } = state.lessons;
    return {
        user,

        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,

        add_courses_loading,
        add_courses_message,
        add_courses_errors,
        add_courses_error_message,
        add_courses,

        edit_courses_loading,
        edit_courses_message,
        edit_courses_errors,
        edit_courses_error_message,
        edit_courses,

        edit_published_courses_loading,
        edit_published_courses_message,
        edit_published_courses_errors,
        edit_published_courses_error_message,
        edit_published_courses,

        remove_courses_loading,
        remove_courses_message,
        remove_courses_error,
        remove_courses,

        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,

        get_one_by_lesson_id_lessons,
    };
}
const connectedCoursesConstructorPage = connect(mapStateToProps)(CoursesConstructorPage);
export { connectedCoursesConstructorPage as CoursesConstructorPage };