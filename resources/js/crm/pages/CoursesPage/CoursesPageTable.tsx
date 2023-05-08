import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Tabs, IconButton, Modal, ModalHeader, ModalBody, ModalActions, TabsMenu } from '../../_components/UI';
import { CoursesCard, PageAlert, PageLoader, PartAlert, PartLoader, RemoveCourseModal } from '../../_components';

import { User } from '../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';

import moment from 'moment';
import { ChartLineUpOutlineIcon, PenIcon, TrashIcon } from "../../_components/UI/Icons";


const CoursesTableActions: FunctionComponent = ({ course, setIsOpenRemoveCourseModal, setSelectedCourseToModal }) => {
    let navigate = useNavigate();
    return (
        <div>
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/courses/constructor/edit/${course.kk_course_id}`)} />
            <IconButton icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Удалить" onClick={() => { setIsOpenRemoveCourseModal(true), setSelectedCourseToModal(course) }} />
            <IconButton icon={<ChartLineUpOutlineIcon size={20}  />} title="Статисика по курсу" onClick={() => { navigate(`/courses/statistic/${course.kk_course_id}`) }} />
        </div>
    )
}

type CoursesPageTableProps = {
    dispatch: any;
    user: User;

    loading: boolean;
    error_message: string | null;
    columns: object[];
    data: object[] | null;

    setSelectedCourseToModal: any;
    setIsOpenRemoveCourseModal: any;
}

const CoursesPageTable: FunctionComponent<CoursesPageTableProps> = ({
    dispatch,
    user,
    loading,
    error_message,
    columns = [
        {
            Header: 'ID',
            accessor: 'kk_course_id',
        },
        {
            Header: 'Название',
            accessor: 'kk_course_name',
        },
        {
            Header: 'Кол-во уроков',
            accessor: 'lessons_count',
        },

        {
            Header: 'Статус',
            accessor: row => row.kk_course_published === 1 ? `Опубликован` : `Не опубликован`,
        },
        {
            Header: 'Действия',
            accessor: row => <CoursesTableActions course={row} setSelectedCourseToModal={setSelectedCourseToModal} setIsOpenRemoveCourseModal={setIsOpenRemoveCourseModal}  />
        },
        {
            Header: 'Дата обновления',
            accessor: row => moment(row.kk_course_updated_at).format('DD.MM.YYYY HH:mm'),
        },
    ],
    data,

    setIsOpenRemoveCourseModal,
    setSelectedCourseToModal,
}): JSX.Element => {
    const memoried_columns = React.useMemo(() => columns, [])


    if (loading) return <PartLoader />
    if (error_message) return <PartAlert type={'danger'} message={error_message} />

    return <Table columns={memoried_columns} data={data} />;
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

const connectedCoursesPageTable = connect(mapStateToProps)(CoursesPageTable);
export { connectedCoursesPageTable as CoursesPageTable };