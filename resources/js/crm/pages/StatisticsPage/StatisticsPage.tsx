import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { User } from '../../../public/_interfaces';
import './index.css';
import { useNavigate } from "react-router-dom";
import { Tabs } from "../../../public/_components/UI";
import { StatisticGraphic } from "./";
import { async } from "regenerator-runtime";
import { statisticActions } from "../../_actions";
import moment from "moment";
import { PartLoader } from "../../../public/_components";


type StatisticsPageProps = {
    dispatch: any;
    user: User;

    users_statistic_loading: boolean,
    users_statistic_message: null | string,
    users_statistic_count: number,
    users_statistic_period_count: number,
    users_statistic_data: [],
    users_statistic_error: null | string,

    courses_users_progress_statistic_loading: boolean,
    courses_users_progress_statistic_message: null | string,
    courses_users_progress_statistic_count: number,
    courses_users_progress_statistic_period_count: number,
    courses_users_progress_statistic_data: [],
    courses_users_progress_statistic_error: null | string,
}

const StatisticsPage: FunctionComponent<StatisticsPageProps> = ({
    dispatch,
    user,

    users_statistic_loading,
    users_statistic_message,
    users_statistic_count,
    users_statistic_period_count,
    users_statistic_data,
    users_statistic_error,

    courses_users_progress_statistic_loading,
    courses_users_progress_statistic_message,
    courses_users_progress_statistic_count,
    courses_users_progress_statistic_period_count,
    courses_users_progress_statistic_data,
    courses_users_progress_statistic_error,
}): JSX.Element => {
    let navigate = useNavigate();
    useEffect(() => {
        const init = async () => {
            if (!users_statistic_loading) await dispatch(statisticActions.users({
                start_date: moment().startOf('month').format('YYYY-MM-DD'),
                end_date: moment().endOf('month').format('YYYY-MM-DD'),
            }));
            if (!courses_users_progress_statistic_loading) await dispatch(statisticActions.courses_users_progress({
                start_date: moment().startOf('month').format('YYYY-MM-DD'),
                end_date: moment().endOf('month').format('YYYY-MM-DD'),
            }));
        }
        init();
    }, []);


    return (
        <div className={`statistics_page`}>
            <Tabs tabs={[
                {
                    key: 1,
                    menuTitle: "Пользователи",
                    contentComponent: <StatisticGraphic
                        itemName={"польз."}
                        dataKey={"users"}
                        count={users_statistic_count}
                        pariodCount={users_statistic_period_count}
                        data={users_statistic_data}
                        dataLoading={users_statistic_loading}
                        dataRequest={(params) => dispatch(statisticActions.users(params))}
                    />,
                },
                {
                    key: 2,
                    menuTitle: "Прохождение курсов",
                    contentComponent: <StatisticGraphic
                    itemName={"начато прохождений"}
                    dataKey={"cup"}
                    count={courses_users_progress_statistic_count}
                    pariodCount={courses_users_progress_statistic_period_count}
                    data={courses_users_progress_statistic_data}
                    dataLoading={courses_users_progress_statistic_loading}
                    dataRequest={(params) => dispatch(statisticActions.courses_users_progress(params))}
                />,
                },
            ]} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        users_statistic_loading,
        users_statistic_message,
        users_statistic_count,
        users_statistic_period_count,
        users_statistic_data,
        users_statistic_error,

        courses_users_progress_statistic_loading,
        courses_users_progress_statistic_message,
        courses_users_progress_statistic_count,
        courses_users_progress_statistic_period_count,
        courses_users_progress_statistic_data,
        courses_users_progress_statistic_error,
    } = state.statistic;
    return {
        user,

        users_statistic_loading,
        users_statistic_message,
        users_statistic_count,
        users_statistic_period_count,
        users_statistic_data,
        users_statistic_error,

        courses_users_progress_statistic_loading,
        courses_users_progress_statistic_message,
        courses_users_progress_statistic_count,
        courses_users_progress_statistic_period_count,
        courses_users_progress_statistic_data,
        courses_users_progress_statistic_error,
    };
}
const connectedStatisticsPage = connect(mapStateToProps)(StatisticsPage);
export { connectedStatisticsPage as StatisticsPage };