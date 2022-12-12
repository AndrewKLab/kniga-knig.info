import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Table, Tabs, IconButton, Modal, ModalHeader, ModalBody, ModalActions } from '../../_components/UI';
import { CoursesCard, PageLoader, RemoveCourseModal } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';

import moment from 'moment';
import { PenIcon, TrashIcon } from "../../_components/UI/Icons";
import { SettingsAssetsModule } from "./SettingsAssetsModule";




type SettingsPageProps = {
    dispatch: any;
    user: User;

}


const SettingsPage: FunctionComponent<SettingsPageProps> = ({
    dispatch,
    user,

}): JSX.Element => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const init = async () => {

            setLoading(false)
        }
        init();
    }, []);



    if (loading ) return <PageLoader />

    return (
        <div>
            <h1 className={`crm_panel_page_title`}>Настройки</h1>
            <Tabs tabs={[{
                    key: 0,
                    menuTitle: `Настройки доступа`,
                    contentComponent: <SettingsAssetsModule/>
                }]} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;

    return {
        user,

    };
}
const connectedSettingsPage = connect(mapStateToProps)(SettingsPage);
export { connectedSettingsPage as SettingsPage };