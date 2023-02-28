import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { PageLoader, } from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate } from "react-router-dom";
import './index.css';

import { Button, Col, Dropdown, IconButton, Image, Row } from "../../../../public/_components/UI";
import { pagesActions, usersActions } from "../../../_actions";
import { usersService } from "../../../_services";
import { ChatIcon, PenIcon } from "../../../_components/UI/Icons";
import { config } from "../../../../public/_helpers";
import moment from "moment";
import { MyUsersTreeModuleList } from "./";

type MyUsersTreeModuleProps = {
    dispatch: any;
    user: User;
    get_one_by_user_id_users_loading: boolean,
    get_one_by_user_id_users_message: string | null,
    get_one_by_user_id_users_error: string | null,
    get_one_by_user_id_users: object | null,

    user_for_tree_info: object | null,
}

const MyUsersTreeModule: FunctionComponent<MyUsersTreeModuleProps> = ({
    dispatch,
    user,
    get_one_by_user_id_users_loading,
    get_one_by_user_id_users_message,
    get_one_by_user_id_users_error,
    get_one_by_user_id_users,

    user_for_tree_info
}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await dispatch(usersActions.getOneByUserId({ kk_user_id: user.kk_user_id, parts: 'admin,coordinator,pastor,teather,promouter' }));
            setLoading(false)
        }
        init();
    }, []);


    if (loading || get_one_by_user_id_users_loading) return <PageLoader />
    return (
        <div className={`users_page_module`}>
            <Row g={3}>
                <Col sm={12} lg={3} style={{ overflow: "auto" }}>
                    <MyUsersTreeModuleList user={get_one_by_user_id_users} />
                </Col>
                <Col sm={12} lg={9}>
                    {user_for_tree_info ? <div className={`users_info_page`}>
                        <div className={`users_info_page_title_container`}>
                            <h1 className={`crm_panel_page_title`}><a className={`cursor-pointer`} onClick={() => navigate(`/users`)}>Пользователи |</a>  <span>{`"${user_for_tree_info?.kk_user_lastname} ${user_for_tree_info?.kk_user_firstname}"`} </span> </h1>
                            <div className="d-flex gap-3">
                                <IconButton icon={<ChatIcon size={30} color={`rgba(var(--alert-success-color), 1)`} />} title="Перейти к диалогу с пользователем" onClick={() => openChat(user_for_tree_info)} />
                                <IconButton icon={<PenIcon size={30} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/users/action/edit/${user_for_tree_info?.kk_user_id}`)} />
                            </div>
                        </div>
                        <div className={`users_info_page_user_card`}>
                            <Row g={3}>
                                <Col xs={12} lg={2}>
                                    <Image className={`users_info_page_user_card_image`} src={`${config.images.avatars}/${user_for_tree_info?.kk_user_avatar ? user_for_tree_info?.kk_user_avatar : config.defaultUserAvatar}`} />
                                </Col>
                                <Col xs={12} lg={10}>
                                    <Row g={3}>
                                        <Col xs={12} lg={12}><h1 className={`users_info_page_user_card_title`}>{user_for_tree_info?.kk_user_lastname} {user_for_tree_info?.kk_user_firstname} {user_for_tree_info?.kk_user_middlename}</h1></Col>
                                        <Col xs={12} lg={6} className={'mb-3'}>
                                            <table className={'table users_info_page_table'}>
                                                <tbody>
                                                    <tr>
                                                        <th>Номер телефона:</th>
                                                        <td>{user_for_tree_info?.kk_user_phonenumber ? `+7${user_for_tree_info?.kk_user_phonenumber}` : null}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>E-mail:</th>
                                                        <td>{user_for_tree_info?.kk_user_email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Страна:</th>
                                                        <td>{user_for_tree_info?.kk_user_country}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Город:</th>
                                                        <td>{user_for_tree_info?.kk_user_sity}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Организация:</th>
                                                        <td>{user_for_tree_info?.kk_user_commune}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Оффлайн пользователь:</th>
                                                        <td>{user_for_tree_info?.kk_user_offline_user === 0 ? 'Нет' : 'Да'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Дата регистрации:</th>
                                                        <td>{moment(user_for_tree_info?.kk_user_created_at).format('DD.MM.YYYY HH:mm')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <table className={'table users_info_page_table'}>
                                                <tbody>
                                                    <tr>
                                                        <th>Роль:</th>
                                                        <td>{user_for_tree_info?.role?.kk_role_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Администратор:</th>
                                                        <td>{user_for_tree_info?.admin?.kk_user_lastname} {user_for_tree_info?.admin?.kk_user_firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Координатор:</th>
                                                        <td>{user_for_tree_info?.coordinator?.kk_user_lastname} {user_for_tree_info?.coordinator?.kk_user_firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Пастор:</th>
                                                        <td>{user_for_tree_info?.pastor?.kk_user_lastname} {user_for_tree_info?.pastor?.kk_user_firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Учитель:</th>
                                                        <td>{user_for_tree_info?.teather?.kk_user_lastname} {user_for_tree_info?.teather?.kk_user_firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Промоутер:</th>
                                                        <td>{user_for_tree_info?.promouter?.kk_user_lastname} {user_for_tree_info?.promouter?.kk_user_firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Дата обновления:</th>
                                                        <td>{moment(user_for_tree_info?.kk_user_updated_at).format('DD.MM.YYYY HH:mm')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                    </div>
                        : <React.Fragment></React.Fragment>
                    }
                </Col>
            </Row>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,

        user_for_tree_info
    } = state.users;
    return {
        user,
        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,
        user_for_tree_info
    };
}
const connectedMyUsersTreeModule = connect(mapStateToProps)(MyUsersTreeModule);
export { connectedMyUsersTreeModule as MyUsersTreeModule };

