import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Image, Button, Label, InputGroup, TextInput, InputGroupButton } from '../../_components/UI';
import { CoursesCard } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../_actions";
import { useNavigate } from "react-router-dom";
import './index.css';
import { config } from "../../_helpers";
import { MyUsersModule } from '../UsersPage';
import PageBuilder from "../../_components/PageBuilder/PageBuilder";

type HomePageProps = {
    dispatch: any;
    user: User;
}

const HomePage: FunctionComponent<HomePageProps> = ({
    dispatch,
    user,


}): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {
        const init = async () => {

        }
        init();
    }, []);

    return (
        <div className={`home_page`}>
            <h1>Добро пожаловать в crm панель</h1>
            <Label>Ваша ссылка промоутера:</Label>
            <InputGroup>
                <TextInput readOnly value={`${config.appUrl}/registration?referal_user=${user.kk_user_id}`} />
                <InputGroupButton onClick={(event) => navigator.clipboard.writeText(`${config.appUrl}/registration?referal_user=${user.kk_user_id}`)}>копировать</InputGroupButton>
            </InputGroup>

            {user?.role?.kk_role_type == 'ROLE_PROMOUTER' &&
                <React.Fragment>
                    <div className={`courses_page_header`}>
                        <h1>Пользователи которые зарегестрировалить по данной ссылке:</h1>
                    </div>
                    <MyUsersModule />
                </React.Fragment>
            }
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };