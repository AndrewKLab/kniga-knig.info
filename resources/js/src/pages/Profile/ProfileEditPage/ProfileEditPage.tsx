import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Label, TextInput, InputGroup, InputGroupText, InputError, Checkbox, IconButton, Alert, Form } from '../../../_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../_interfaces';
import { authActions } from "../../../_actions";
import { useNavigate, Link } from "react-router-dom";
import './index.css';

type ProfileEditPageProps = {
    dispatch: any;
    user: User;
    edit_auth_user_loading: boolean,
    edit_auth_user_message: string | null,
    edit_auth_user_errors: object | null,
    edit_auth_user_error_message: string | null,
}

const ProfileEditPage: FunctionComponent<ProfileEditPageProps> = ({
    dispatch,
    user,
    edit_auth_user_loading,
    edit_auth_user_message,
    edit_auth_user_errors,
    edit_auth_user_error_message,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
        kk_user_lastname: user.kk_user_lastname,
        kk_user_firstname: user.kk_user_firstname,
        kk_user_middlename: user.kk_user_middlename,
        kk_user_phonenumber: user.kk_user_phonenumber,
        kk_user_email: user.kk_user_email,
        kk_user_country: user.kk_user_country,
        kk_user_sity: user.kk_user_sity,
        kk_user_commune: user.kk_user_commune,
    }
});
    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('editAuthUser');
        return token;
    }, [executeRecaptcha]);

    const onSubmitLoginForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.editAuthUser({ ...data, "g-recaptcha-response": token }))
    };

    const prepareValueToInput = (value) => value ? value : '';


    return (
        <div className={`profile_page`}>
            <h1 className={`profile_page_title`}>Изменить Профиль</h1>
            <Form className={`registration_page_form`} onSubmit={handleSubmit(onSubmitLoginForm)}>
                <Row g={3}>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_lastname">Фамилия:</Label>
                        <TextInput
                            {...register('kk_user_lastname')}
                            type={`text`}
                            id={`kk_user_lastname`}
                            name={`kk_user_lastname`}
                            placeholder={`Введите фамилию...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_lastname'} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_firstname">Имя:</Label>
                        <TextInput
                            {...register('kk_user_firstname')}
                            type={`text`}
                            id={`kk_user_firstname`}
                            name={`kk_user_firstname`}
                            placeholder={`Введите имя...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_firstname'} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_firstname">Отчество:</Label>
                        <TextInput
                            {...register('kk_user_middlename')}
                            type={`text`}
                            id={`kk_user_middlename`}
                            name={`kk_user_middlename`}
                            placeholder={`Введите отчество...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_middlename'} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_email">E-mail:</Label>
                        <TextInput
                            {...register('kk_user_email')}
                            type={`email`}
                            id={`kk_user_email`}
                            name={`kk_user_email`}
                            placeholder={`Введите E-mail...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_email'} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <Label htmlFor="kk_user_phonenumber">Номер телефона:</Label>
                        <InputGroup>
                            <InputGroupText>+7</InputGroupText>
                            <TextInput
                                {...register('kk_user_phonenumber')}
                                type={`text`}
                                id={`kk_user_phonenumber`}
                                name={`kk_user_phonenumber`}
                                placeholder={`Введите Номер телефона...`}
                            />
                        </InputGroup>
                        <InputError errors={edit_auth_user_errors} name={'kk_user_phonenumber'} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_country">Страна:</Label>
                        <TextInput
                            {...register('kk_user_country')}
                            type={`text`}
                            id={`kk_user_country`}
                            name={`kk_user_country`}
                            placeholder={`Введите страну...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_country'} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_sity">Город:</Label>
                        <TextInput
                            {...register('kk_user_sity')}
                            type={`text`}
                            id={`kk_user_sity`}
                            name={`kk_user_sity`}
                            placeholder={`Введите город...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_sity'} />
                    </Col>
                    <Col xs={12} lg={4}>
                        <Label htmlFor="kk_user_commune">Община:</Label>
                        <TextInput
                            {...register('kk_user_commune')}
                            type={`text`}
                            id={`kk_user_commune`}
                            name={`kk_user_commune`}
                            placeholder={`Введите общину...`}
                        />
                        <InputError errors={edit_auth_user_errors} name={'kk_user_commune'} />
                    </Col>



                    <Col xs={12} md={12}>
                        <InputError errors={edit_auth_user_errors} name={'g-recaptcha-response'} />
                        {edit_auth_user_message && <Alert message={edit_auth_user_message} type={'success'} />}
                        {edit_auth_user_error_message && <Alert message={edit_auth_user_error_message} type={'danger'} />}
                        <Button type={`submit`} className={`registration_page_button`} loading={edit_auth_user_loading} disabled={edit_auth_user_loading}>Сохранить</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    const {
        user,
        edit_auth_user_loading,
        edit_auth_user_message,
        edit_auth_user_errors,
        edit_auth_user_error_message,
    } = state.auth;

    return {
        user,
        edit_auth_user_loading,
        edit_auth_user_message,
        edit_auth_user_errors,
        edit_auth_user_error_message,
    };
}
const connectedProfileEditPage = connect(mapStateToProps)(ProfileEditPage);
export { connectedProfileEditPage as ProfileEditPage };