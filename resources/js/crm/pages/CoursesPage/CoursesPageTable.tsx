import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Tabs, IconButton, Modal, ModalHeader, ModalBody, ModalActions, TabsMenu } from '../../_components/UI';
import { CoursesCard, PageAlert, PageLoader, PartAlert, PartLoader, RemoveCourseModal } from '../../_components';

import { User } from '../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';

import moment from 'moment';
import { ChartLineUpOutlineIcon, PenIcon, TrashIcon } from "../../_components/UI/Icons";
import { Share } from "../../../public/_components/UI";
import { ShareOutlineIcon } from "../../../public/_components/UI/Icons";
import { config } from "../../../public/_helpers";


const CoursesTableActions: FunctionComponent = ({ user, course, setIsOpenRemoveCourseModal, setSelectedCourseToModal }) => {
    let navigate = useNavigate();
    const [showShare, setShowShare] = useState(false);
    return (
        <div className="d-flex">
            <IconButton icon={<PenIcon size={20} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/courses/constructor/edit/${course.kk_course_id}`)} />
            <IconButton icon={<TrashIcon size={20} color={`rgba(var(--alert-danger-color), 1)`} />} title="Удалить" onClick={() => { setIsOpenRemoveCourseModal(true), setSelectedCourseToModal(course) }} />
            <IconButton icon={<ChartLineUpOutlineIcon size={20} />} title="Статисика по курсу" onClick={() => { navigate(`/courses/statistic/${course.kk_course_id}`) }} />
            <div className={`courses-share-buttons`} onClick={(event) => event.stopPropagation()}>

                <IconButton icon={<ShareOutlineIcon size={16} />} onClick={(event) => { event.stopPropagation(), setShowShare(!showShare) }} />
                <Share link={`${config.appUrl}/registration?referal_user=${user?.kk_user_id}%26course=${course.kk_course_id}`} className={`${showShare ? `active` : ``}`} whatsapp viber telegram sms copy />
            </div>
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
            Header: 'Промо страница',
            accessor: row => row.course_promo ? <a className={`link`} target="_blank" href={`${config.appUrl}/courses_promo/${row.course_promo.kk_cp_id}`}>Перейти</a> : null,
        },
        {
            Header: 'Действия',
            accessor: row => <CoursesTableActions user={user} course={row} setSelectedCourseToModal={setSelectedCourseToModal} setIsOpenRemoveCourseModal={setIsOpenRemoveCourseModal} />
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