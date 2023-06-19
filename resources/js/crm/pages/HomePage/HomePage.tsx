import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Image, Button, Label, InputGroup, TextInput, InputGroupButton } from '../../_components/UI';
import { CoursesCard } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../_actions";
import { Link, useNavigate } from "react-router-dom";
import './index.css';
import { config } from "../../_helpers";
import { MyUsersModule } from '../UsersPage';
import PageBuilder from "../../_components/PageBuilder/PageBuilder";
import { copyToClipboard } from "../../../public/_helpers";

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

    const downloadEmployeeData = () => {
        fetch(`/assets/img/site/main_site_qr_code.png`)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'main_site_qr_code.png';
                    a.click();
                });
                //window.location.href = response.url;
            });
    }

    return (
        <div className={`home_page`}>
            <h1>Добро пожаловать в crm панель</h1>
            <p>Это QR-код основной страницы сайта <a href={`${config.appUrl}`} target="_blank" className={`link`}>kniga-knig.info</a></p>
            <div className={`home_page_qr_code_container`}>
                <Image src={`site/main_site_qr_code.png`} />
                <Button onClick={() => downloadEmployeeData()}>Скачать</Button>
            </div>
            <Label>Ваша клиентская ссылка сеятеля:</Label>
            <InputGroup>
                <TextInput readOnly value={`${config.appUrl}/registration?referal_user=${user.kk_user_id}`} />
                <InputGroupButton onClick={(event) => copyToClipboard(`${config.appUrl}/registration?referal_user=${user.kk_user_id}`)}>копировать</InputGroupButton>
            </InputGroup>
            <p>Вы можете создать свой персональный QR-код, перейдя по <a href={`https://www.qrcode-monkey.com/`} target="_blank" className={`link`}>ССЫЛКЕ</a></p>


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