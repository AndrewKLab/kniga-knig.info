import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Select, Alert, List, ListItem, IconButton } from '../../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon, TrashIcon } from '../../../_components/UI/Icons';

import { User } from '../../../_interfaces';
import { coursesActions, coursesCategoriesActions, lessonsActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './index.css';
import { FinishCourseButton, ImageDropzone, PageLoader, PartLoader, Question, RemoveLessonModal, TextEditor } from "../../../_components";
import { NoMatchPage } from "../..";
import moment from 'moment';
import 'moment/dist/locale/ru';


type CoursesConstructorLessonsListProps = {
    dispatch: any;
    user: User;
    kk_course_id: string;

    get_all_by_course_id_lessons_loading: boolean,
    get_all_by_course_id_lessons_message: string | null,
    get_all_by_course_id_lessons_error: string | null,
    get_all_by_course_id_lessons: Array<object> | null,
    lesson_editor_is_lesson_edit: boolean;
}

const CoursesConstructorLessonsList: FunctionComponent<CoursesConstructorLessonsListProps> = ({
    dispatch,
    user,
    kk_course_id,

    get_all_by_course_id_lessons_loading,
    get_all_by_course_id_lessons_message,
    get_all_by_course_id_lessons_error,
    get_all_by_course_id_lessons,
    lesson_editor_is_lesson_edit,

}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isOpenRemoveLessonModal, setIsOpenRemoveLessonModal] = useState(false);
    const [selectedLessonToModal, setSelectedLessonToModal] = useState(null);


    useEffect(() => {
        const init = async () => {
            await dispatch(lessonsActions.getAllByCourseId({ kk_lesson_course_id: kk_course_id }))
            setLoading(false)
        }
        init();
    }, []);

    const addNewLesson = () => {
        if(lesson_editor_is_lesson_edit) dispatch({ type: "OPEN_IS_LESSON_EDIT_MODAL", open:true })
        else dispatch(lessonsActions.setLessonEditor('add', null));
    }
    const selectLessonToEdit = (lesson) => {
        console.log(lesson_editor_is_lesson_edit);
        
        if(lesson_editor_is_lesson_edit) dispatch({ type: "OPEN_IS_LESSON_EDIT_MODAL", open:true })
        else dispatch(lessonsActions.setLessonEditor('edit', lesson.kk_lesson_id))
    }
    const openDeleteLessonModal = async (event, lesson) => {
        event.stopPropagation()
        setIsOpenRemoveLessonModal(true);
        setSelectedLessonToModal(lesson);
    }
    const onDeleteLesson = async (event, lesson) => {
        event.stopPropagation()
        await dispatch(lessonsActions.remove({ kk_lesson_id: lesson.kk_lesson_id }));
        dispatch(lessonsActions.setLessonEditor(null, null));
        await dispatch(lessonsActions.getAllByCourseId({ kk_lesson_course_id: kk_course_id }));

        setIsOpenRemoveLessonModal(false);
        setSelectedLessonToModal(null);
    }


    if (loading || get_all_by_course_id_lessons_loading) return <PartLoader />
    return (
        <div className={`courses_constructor_lessons_list_container`}>
            <RemoveLessonModal isOpen={isOpenRemoveLessonModal} setIsOpen={setIsOpenRemoveLessonModal} lesson={selectedLessonToModal} onDelete={onDeleteLesson} />

            <h3 className={`courses_constructor_lessons_list_title`}>Уроки:</h3>
            {get_all_by_course_id_lessons && get_all_by_course_id_lessons.length > 0 ? (
                <React.Fragment>
                    <List className={`courses_constructor_lessons_list`}
                        dataSource={get_all_by_course_id_lessons}
                        renderItem={(lesson) =>
                            <ListItem
                                key={lesson.kk_lesson_id}
                                className={`courses_constructor_lessons_list_item`}
                                itemTitle={<React.Fragment><b>#{lesson.kk_lesson_number}</b> {lesson.kk_lesson_name}</React.Fragment>}
                                itemRightComponent={<IconButton icon={<TrashIcon size={20} />} onClick={(event) => openDeleteLessonModal(event, lesson)} />}
                                onClick={() => selectLessonToEdit(lesson)} />}
                    />
                    <div className={`courses_constructor_lessons_empty_list`}>
                        <Button className="w-100" onClick={addNewLesson}>Добавить</Button>
                    </div>
                </React.Fragment>
            ) : (
                <div className={`courses_constructor_lessons_empty_list`}>
                    <p>В данном курсе нет уроков.</p>
                    <Button className="w-100" onClick={addNewLesson}>Добавить</Button>
                </div>
            )}

        </div >
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_by_course_id_lessons_loading,
        get_all_by_course_id_lessons_message,
        get_all_by_course_id_lessons_error,
        get_all_by_course_id_lessons,
        lesson_editor_is_lesson_edit,
    } = state.lessons;

    return {
        user,

        get_all_by_course_id_lessons_loading,
        get_all_by_course_id_lessons_message,
        get_all_by_course_id_lessons_error,
        get_all_by_course_id_lessons,
        lesson_editor_is_lesson_edit
    };
}
const connectedCoursesConstructorLessonsList = connect(mapStateToProps)(CoursesConstructorLessonsList);
export { connectedCoursesConstructorLessonsList as CoursesConstructorLessonsList };