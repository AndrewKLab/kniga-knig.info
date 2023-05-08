import React, { FunctionComponent, useState } from "react";
import { connect } from 'react-redux';
import './index.css';
import { useNavigate } from "react-router-dom";
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from "recharts";
import { Button, Col, Row } from "../../../public/_components/UI";
import moment from "moment";
import { PageLoader, PartLoader } from "../../../public/_components";


type StatisticGraphicProps = {
    itemName: string,
    dataKey: string,
    count: number,
    pariodCount: number,
    data: [],
    dataRequest: any;
    dataLoading: boolean;
}

export const StatisticGraphic: FunctionComponent<StatisticGraphicProps> = ({
    itemName,
    dataKey,
    count,
    pariodCount,
    data,
    dataRequest,
    dataLoading,
}): JSX.Element => {
    let navigate = useNavigate();
    const [activePeriod, setActivePeriod] = useState(2);

    const loadPeriod = (key, period) => {
        setActivePeriod(key)
        dataRequest({
            start_date: moment().startOf(period).format('YYYY-MM-DD'),
            end_date: moment().endOf(period).format('YYYY-MM-DD'),
        })
    }

    if (dataLoading) return <PartLoader />
    return (
        <div className={`statistics_graphic`}>
            <Row g={3}>

                <Col lg={12}>
                    <ResponsiveContainer height={500} width="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, bottom: 5 }}
                        >
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line type="monotone" dataKey={dataKey} stroke="rgba(var(--primary-color), 1)" name={itemName} />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col lg={12}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div >
                            <div>Всего: {count}</div>
                            <div>Всего за выбранный период: {pariodCount}</div>
                        </div>
                        <div className="d-flex gap-3">
                            <Button color={activePeriod === 1 ? "primary" : ""} onClick={() => loadPeriod(1, 'week')}>Неделя</Button>
                            <Button color={activePeriod === 2 ? "primary" : ""} onClick={() => loadPeriod(2, 'month')}>Месяц</Button>
                            <Button color={activePeriod === 3 ? "primary" : ""} onClick={() => loadPeriod(3, 'year')}>Год</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

// function mapStateToProps(state) {
//     const { user } = state.auth;
//     return { user };
// }
// const connectedStatisticGraphic = connect(mapStateToProps)(StatisticGraphic);
// export { connectedStatisticGraphic as StatisticGraphic };