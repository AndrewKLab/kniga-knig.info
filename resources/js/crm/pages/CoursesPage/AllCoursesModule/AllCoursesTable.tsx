import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { PartLoader, RemoveCourseModal } from '../../../_components';

import { User } from '../../../_interfaces';
import { coursesActions, usersActions } from "../../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';

import { CoursesPageTable } from "../CoursesPageTable";

type AllCoursesTableProps = {
    dispatch: any;
    user: User;
    kk_course_categoty_id: number;
    get_all_by_category_id_courses_loading: boolean;
    get_all_by_category_id_courses_message: string | null,
    get_all_by_category_id_courses_error: string | null,
    get_all_by_category_id_courses: any,
}

const AllCoursesTable: FunctionComponent<AllCoursesTableProps> = ({
    dispatch,
    user,
    kk_course_categoty_id,

    get_all_by_category_id_courses_loading,
    get_all_by_category_id_courses_message,
    get_all_by_category_id_courses_error,
    get_all_by_category_id_courses,
}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isOpenRemoveCourseModal, setIsOpenRemoveCourseModal] = useState(false);
    const [selectedCourseToModal, setSelectedCourseToModal] = useState(null);


    useEffect(() => {
        const init = async () => {
            await dispatch(coursesActions.getAllByCategoryId({ parts_to_count: 'lessons', kk_course_categoty_id: kk_course_categoty_id }))
            setLoading(false)
        }
        init();
    }, [kk_course_categoty_id]);

    const onDeleteCourse = async () => {
        await dispatch(coursesActions.remove({ kk_course_id: selectedCourseToModal?.kk_course_id }))
        await dispatch(coursesActions.getAllByCategoryId({ parts_to_count: 'lessons', kk_course_categoty_id: selectedCourseToModal?.kk_course_categoty_id }))
        setIsOpenRemoveCourseModal(false);
        setSelectedCourseToModal(null);
    }

    if (loading || get_all_by_category_id_courses_loading) return <PartLoader />
    return (
        <div className={`users_page_module_table`}>

            <CoursesPageTable
                loading={get_all_by_category_id_courses_loading}
                error_message={get_all_by_category_id_courses_error}
                data={get_all_by_category_id_courses}
                
                setIsOpenRemoveCourseModal={setIsOpenRemoveCourseModal}
                setSelectedCourseToModal={setSelectedCourseToModal}
            />

            <RemoveCourseModal isOpen={isOpenRemoveCourseModal} setIsOpen={setIsOpenRemoveCourseModal} course={selectedCourseToModal} onDelete={onDeleteCourse} />

        </div>
    )
}

function mapStateToPropsAllCoursesTable(state) {
    const { user } = state.auth;
    const {
        get_all_by_category_id_courses_loading,
        get_all_by_category_id_courses_message,
        get_all_by_category_id_courses_error,
        get_all_by_category_id_courses,
    } = state.courses;
    return {
        user,

        get_all_by_category_id_courses_loading,
        get_all_by_category_id_courses_message,
        get_all_by_category_id_courses_error,
        get_all_by_category_id_courses,
    };
}
const connectedAllCoursesTable = connect(mapStateToPropsAllCoursesTable)(AllCoursesTable);
export { connectedAllCoursesTable as AllCoursesTable };