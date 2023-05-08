import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import './index.css';
import { useNavigate, useParams } from "react-router-dom";
import { Course, User } from "../../../../public/_interfaces";
import { Table } from "../../../_components/UI";
import { statisticActions } from "../../../_actions";
import { PageLoader } from "../../../../public/_components";
import { PageAlert } from "../../../_components";
import { IconButton } from "../../../../public/_components/UI";
import { DownloadIcon } from "../../../../public/_components/UI/Icons";
import { config } from "../../../../public/_helpers";
import { statisticService } from "../../../_services";

type CourseStatisticPageProps = {
    dispatch: any;
    user: User;

    get_statistic_by_course_loading: boolean,
    get_statistic_by_course_message: null | string,
    get_statistic_by_course: null | Course,
    get_statistic_by_course_error: null | string,
}

const CourseStatisticPage: FunctionComponent<CourseStatisticPageProps> = ({
    dispatch,
    user,

    get_statistic_by_course_loading,
    get_statistic_by_course_message,
    get_statistic_by_course,
    get_statistic_by_course_error,
}): JSX.Element => {
    let navigate = useNavigate();
    let { kk_course_id } = useParams();
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        dispatch(statisticActions.getStatisticByCourse({
            kk_course_id: kk_course_id
        }))
        setLoading(false)

    }, [])

    if (get_statistic_by_course_loading || loading) return <PageLoader />
    else if (get_statistic_by_course_error) return <PageAlert type="danger" message={get_statistic_by_course_error} />
    else return get_statistic_by_course ? <div className={`course_statistic_page`}>
        <h5 className={'course_statistic_page_title'}>Статистика по курсу: <span className="text-primary">{get_statistic_by_course.kk_course_name}</span></h5>
        <div><b>Курс начали проходить:</b> {get_statistic_by_course.cup_started_count} раз.</div>
        <div className="mb-3"><b>Курс завершили:</b> {get_statistic_by_course.cup_finished_count} раз.</div>
        <Table

            disablePagination={true}
            columns={[
                {
                    Header: '№',
                    accessor: 'kk_lesson_number',
                },
                {
                    Header: 'Название',
                    accessor: 'kk_lesson_name',
                },
                {
                    Header: 'Начато(раз.)',
                    accessor: row => <div className={`d-flex align-items-center justify-content-start gap-3`}>
                        {row.lup_started_count}
                        <IconButton icon={<DownloadIcon size={20} />} onClick={() => statisticService.getUsersEmailByLup({
                            kk_lup_lesson_id: row.kk_lesson_id,
                            kk_lup_status: 'inprocess',
                        })} />
                    </div>,
                },
                {
                    Header: 'Завершено(раз.)',
                    accessor: row => <div className={`d-flex align-items-center justify-content-start gap-3`}>
                        {row.lup_finished_count}
                        <IconButton icon={<DownloadIcon size={20} />} onClick={() => statisticService.getUsersEmailByLup({
                            kk_lup_lesson_id: row.kk_lesson_id,
                            kk_lup_status: 'finished',
                        })} />
                    </div>,

                },
                {
                    Header: 'Не завершено(раз.)',
                    accessor: row => <div className={`d-flex align-items-center justify-content-start gap-3`}>
                        {row.lup_not_finished_count}
                        <IconButton icon={<DownloadIcon size={20} />} onClick={() => statisticService.getUsersEmailByLup({
                            kk_lup_lesson_id: row.kk_lesson_id,
                            kk_lup_status: 'not_finished',
                        })} />
                    </div>,
                },
                // {
                //     Header: 'Незавершено(раз.)',
                //     accessor: 'lup_not_finished_count',
                // },
            ]}
            data={get_statistic_by_course?.lessons ? get_statistic_by_course.lessons : []}
        />
    </div>
        : <React.Fragment></React.Fragment>
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_statistic_by_course_loading,
        get_statistic_by_course_message,
        get_statistic_by_course,
        get_statistic_by_course_error,
    } = state.statistic;
    return {
        user,

        get_statistic_by_course_loading,
        get_statistic_by_course_message,
        get_statistic_by_course,
        get_statistic_by_course_error,
    };
}
const connectedCourseStatisticPage = connect(mapStateToProps)(CourseStatisticPage);
export { connectedCourseStatisticPage as CourseStatisticPage };