import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Alert, InputGroupText, ControlledSelect, Checkbox } from '../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon } from '../../_components/UI/Icons';

import { User } from '../../_interfaces';
import { usersActions, pagesActions, settingsActions } from "../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import './index.css';
import { FinishCourseButton, ImageDropzone, PageLoader, Question, TextEditor } from "../../_components";
import { NoMatchPage } from "../";
import moment from 'moment';
import 'moment/dist/locale/ru';



type UsersPageActionProps = {
    dispatch: any;
    user: User;

    get_all_users_roles_loading: boolean,
    get_all_users_roles_message: string | null,
    get_all_users_roles_error: string | null,
    get_all_users_roles: Array<object> | null,

    get_one_by_user_id_users_loading: boolean,
    get_one_by_user_id_users_message: string | null,
    get_one_by_user_id_users_error: string | null,
    get_one_by_user_id_users: Array<object> | null,


    add_users_loading: boolean;
    add_users_message: string | null,
    add_users_errors: Array<any> | null,
    add_users_error_message: string | null,
    add_users: object | null,

    edit_users_loading: boolean,
    edit_users_message: string | null,
    edit_users_errors: Array<any> | null,
    edit_users_error_message: string | null,
    edit_users: object | null,

    remove_users_loading: boolean;
    remove_users_message: string | null,
    remove_users_error: string | null,
    remove_users: object | null,
}

const UsersPageAction: FunctionComponent<UsersPageActionProps> = ({
    dispatch,
    user,

    get_all_users_roles_loading,
    get_all_users_roles_message,
    get_all_users_roles_error,
    get_all_users_roles,

    get_one_by_user_id_users_loading,
    get_one_by_user_id_users_message,
    get_one_by_user_id_users_error,
    get_one_by_user_id_users,

    add_users_loading,
    add_users_message,
    add_users_errors,
    add_users_error_message,
    add_users,

    edit_users_loading,
    edit_users_message,
    edit_users_errors,
    edit_users_error_message,
    edit_users,

}): JSX.Element => {
    let navigate = useNavigate();
    let { action, kk_user_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [noMatch, setNoMatch] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();



    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(settingsActions.getAllUsersRoles({ parts: 'users' }));
            if (action === 'add') console.log(action)
            else if (action === 'edit') await dispatch(usersActions.getOneByUserId({ kk_user_id: kk_user_id }));
            else setNoMatch(true)

            setLoading(false)
        }
        init();
    }, [kk_user_id]);

    const userActionSubmit = async (data) => {
        if (action === 'add') { await dispatch(usersActions.add(data, navigate)) }
        else if (action === 'edit') await dispatch(usersActions.edit(data))
        console.log(action, data)
    }

    if (noMatch) return <NoMatchPage />
    if (loading || get_all_users_roles_loading || get_one_by_user_id_users_loading) return <PageLoader />
    return (
        <div className={`users_constructor_page`}>
            <h1 className={`crm_panel_page_title`}><a className={`cursor-pointer`} onClick={() => navigate(`/users`)}>Пользователи |</a>  <span>{kk_user_id ? `Изменить пользователя "${get_one_by_user_id_users?.kk_user_lastname} ${get_one_by_user_id_users?.kk_user_firstname}"` : 'Добавить'} </span> </h1>
            <Form id="course_from" onSubmit={handleSubmit(userActionSubmit)}>
                <Row g={3}>
                    <Col xs={12} lg={4}>
                        {action === 'edit' && <TextInput
                            {...register('kk_user_id')}
                            type={`hidden`}
                            id={`kk_user_id`}
                            name={`kk_user_id`}
                            defaultValue={get_one_by_user_id_users?.kk_user_id}
                        />}

                        <Label htmlFor="kk_user_lastname">Фамилия:</Label>
                        <TextInput
                            {...register('kk_user_lastname')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_lastname`}
                            name={`kk_user_lastname`}
                            placeholder={`Введите фамилию...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_lastname : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_lastname'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_lastname'} />}
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_firstname">Имя:</Label>
                        <TextInput
                            {...register('kk_user_firstname')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_firstname`}
                            name={`kk_user_firstname`}
                            placeholder={`Введите имя...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_firstname : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_firstname'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_firstname'} />}
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_middlename">Отчество:</Label>
                        <TextInput
                            {...register('kk_user_middlename')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_middlename`}
                            name={`kk_user_middlename`}
                            placeholder={`Введите отчество...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_middlename : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_middlename'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_middlename'} />}
                    </Col>
                    <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_phonenumber">Телефон:</Label>
                        <InputGroup>
                            <InputGroupText className={`courses_constructor_page_input`}>+7</InputGroupText>

                            <TextInput
                                {...register('kk_user_phonenumber')}
                                className={`courses_constructor_page_input`}
                                type={`text`}
                                id={`kk_user_phonenumber`}
                                name={`kk_user_phonenumber`}
                                placeholder={`Введите телефон...`}
                                defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_phonenumber : null}
                            />

                        </InputGroup>
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_phonenumber'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_phonenumber'} />}
                    </Col>
                    <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_email">E-mail:</Label>
                        <TextInput
                            {...register('kk_user_email')}
                            className={`courses_constructor_page_input`}
                            type={`email`}
                            id={`kk_user_email`}
                            name={`kk_user_email`}
                            placeholder={`Введите e-mail...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_email : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_email'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_email'} />}
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_country">Страна:</Label>
                        <TextInput
                            {...register('kk_user_country')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_country`}
                            name={`kk_user_country`}
                            placeholder={`Введите страну...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_country : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_country'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_country'} />}
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_sity">Город:</Label>
                        <TextInput
                            {...register('kk_user_sity')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_sity`}
                            name={`kk_user_sity`}
                            placeholder={`Введите город...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_sity : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_sity'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_sity'} />}
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_commune">Организация:</Label>
                        <TextInput
                            {...register('kk_user_commune')}
                            className={`courses_constructor_page_input`}
                            type={`text`}
                            id={`kk_user_commune`}
                            name={`kk_user_commune`}
                            placeholder={`Введите организацию...`}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_commune : null}
                        />
                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_commune'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_commune'} />}
                    </Col>
                    {action === 'add' ?
                        <React.Fragment>
                            <Col xs={12} lg={6}>
                                <Label htmlFor="kk_user_password">Пароль:</Label>
                                <TextInput
                                    {...register('kk_user_password')}
                                    className={`courses_constructor_page_input`}
                                    type={`password`}
                                    id={`kk_user_password`}
                                    name={`kk_user_password`}
                                    placeholder={`Введите Пароль...`}
                                />
                                {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_password'} />}
                                {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_password'} />}
                            </Col>
                            <Col xs={12} lg={6}>
                                <Label htmlFor="kk_user_password_confirmation">Подтвердите пароль:</Label>
                                <TextInput
                                    {...register('kk_user_password_confirmation')}
                                    className={`courses_constructor_page_input`}
                                    type={`password`}
                                    id={`kk_user_password_confirmation`}
                                    name={`kk_user_password_confirmation`}
                                    placeholder={`Введите Пароль еще раз...`}
                                />
                                {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_password_confirmation'} />}
                                {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_password_confirmation'} />}
                            </Col>
                        </React.Fragment> : <React.Fragment></React.Fragment>
                    }
                    <Col xs={12} lg={12}>
                        <Label htmlFor="kk_user_role_id">Роль пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_role_id`}
                            placeholder={`Выберите роль пользователя...`}
                            options={get_all_users_roles?.map(role => ({ label: role.kk_role_name, value: role.kk_role_id }))}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_role_id : 7}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_role_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_role_id'} />}
                    </Col>
                    {user?.role?.kk_role_level <= 2 && <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_admin_id">Администратор Пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_admin_id`}
                            placeholder={`Выберите пользователя...`}
                            options={get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_SUPER_ADMIN')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id })).concat(
                                get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_ADMIN')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))
                            )}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_admin_id : null}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_admin_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_admin_id'} />}
                    </Col>}
                    {user?.role?.kk_role_level <= 3 && <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_coordinator_id">Координатор Пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_coordinator_id`}
                            placeholder={`Выберите пользователя...`}
                            options={get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_COORDINATOR')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_coordinator_id : null}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_coordinator_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_coordinator_id'} />}
                    </Col>}
                    {user?.role?.kk_role_level <= 4 &&<Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_pastor_id">Пастор Пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_pastor_id`}
                            placeholder={`Выберите пользователя...`}
                            options={get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_PASTOR')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_pastor_id : null}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_pastor_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_pastor_id'} />}
                    </Col>}
                    {user?.role?.kk_role_level <= 5 && <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_teather_id">Учитель Пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_teather_id`}
                            placeholder={`Выберите пользователя...`}
                            options={get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_TEATHER')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_teather_id : null}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_teather_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_teather_id'} />}
                    </Col>}
                    {user?.role?.kk_role_level <= 6 && <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_promouter_id">Промоутера Пользователя:</Label>
                        <ControlledSelect
                            control={control}
                            name={`kk_user_promouter_id`}
                            placeholder={`Выберите пользователя...`}
                            options={get_all_users_roles?.filter(role => role.kk_role_type === 'ROLE_PROMOUTER')[0]?.users.map(user => ({ label: `${user.kk_user_lastname} ${user.kk_user_firstname}`, value: user.kk_user_id }))}
                            defaultValue={action === 'edit' ? get_one_by_user_id_users?.kk_user_promouter_id : null}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_promouter_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_promouter_id'} />}
                    </Col>}
                    <Col xs={12} lg={12}>
                        <Checkbox
                            {...register('kk_user_offline_user')}
                            id={`kk_user_offline_user`}
                            name={`kk_user_offline_user`}
                            label={`Оффлайн Пользователь`}
                            defaultChecked={action === 'edit' ? get_one_by_user_id_users?.kk_user_offline_user === 0 ? false : true : false}
                        />

                        {action === 'add' && <InputError errors={add_users_errors} name={'kk_user_promouter_id'} />}
                        {action === 'edit' && <InputError errors={edit_users_errors} name={'kk_user_promouter_id'} />}
                    </Col>
                    <Col xs={12} lg={12}>
                        <div className={`courses_constructor_lessons_editor_actions`}>
                            {action === 'add' && add_users_error_message && <Alert message={add_users_error_message} type={'danger'} />}
                            {action === 'edit' && edit_users_error_message && <Alert message={edit_users_error_message} type={'danger'} />}

                            {action === 'add' && add_users_message && <Alert message={add_users_message} type={'success'} />}
                            {action === 'edit' && edit_users_message && <Alert message={edit_users_message} type={'success'} />}

                            <Button type="submit" loading={add_users_loading || edit_users_loading} disabled={add_users_loading || edit_users_loading}>Сохранить</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,
    } = state.settings;
    const {
        add_users_loading,
        add_users_message,
        add_users_errors,
        add_users_error_message,
        add_users,

        edit_users_loading,
        edit_users_message,
        edit_users_errors,
        edit_users_error_message,
        edit_users,

        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,

    } = state.users;
    return {
        user,

        get_all_users_roles_loading,
        get_all_users_roles_message,
        get_all_users_roles_error,
        get_all_users_roles,

        add_users_loading,
        add_users_message,
        add_users_errors,
        add_users_error_message,
        add_users,

        edit_users_loading,
        edit_users_message,
        edit_users_errors,
        edit_users_error_message,
        edit_users,

        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,
    };
}
const connectedUsersPageAction = connect(mapStateToProps)(UsersPageAction);
export { connectedUsersPageAction as UsersPageAction };