import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Label, TextInput, InputGroup, InputGroupText, InputError, Checkbox, IconButton, Alert, Form } from '../../../_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../_interfaces';
import { authActions } from "../../../_actions";
import { useNavigate, Link } from "react-router-dom";
import './index.css';

type LoginPageProps = {
    dispatch: any;

    login_loading: boolean;
    login_message: string | null;
    login_errors: object | null;
    login_error_messge: string | null;
    user: User;
}

const LoginPage: FunctionComponent<LoginPageProps> = ({
    dispatch,

    login_loading,
    login_message,
    login_errors,
    login_error_messge,
    user,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (user) navigate('/');
    }, []);

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('login');
        return token;
    }, [executeRecaptcha]);

    const onSubmitLoginForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.login({ ...data, "g-recaptcha-response": token }, navigate))
    };

    return (
        <div className={`login_page`}>
                    <Form className={`login_page_form`} onSubmit={handleSubmit(onSubmitLoginForm)}>
                        <Row g={3}>
                            <Col xs={12} lg={12}><h1 className={`registration_title text-primary`}>Вход</h1></Col>
                            <Col xs={12} md={12}>
                                <Label htmlFor="kk_user_email_or_kk_user_phone">E-mail или Номер телефона:</Label>
                                <TextInput
                                    {...register('kk_user_email_or_kk_user_phone')}
                                    type={`text`}
                                    id={`kk_user_email_or_kk_user_phone`}
                                    name={`kk_user_email_or_kk_user_phone`}
                                    placeholder={`Введите E-mail или Номер телефона...`}
                                />
                                <InputError errors={login_errors} name={'kk_user_email_or_kk_user_phone'} />
                            </Col>
                            <Col xs={12} lg={12}>
                                <Label htmlFor="kk_user_password">Пароль:</Label>
                                <InputGroup>
                                    <TextInput
                                        {...register('kk_user_password')}
                                        type={`password`}
                                        id={`kk_user_password`}
                                        name={`kk_user_password`}
                                        placeholder={`Введите Пароль...`}
                                    />
                                    {/* <IconButton icon={}/> */}
                                </InputGroup>
                                <InputError errors={login_errors} name={'kk_user_password'} />
                            </Col>
                            <Col xs={12} lg={12}>
                                <Checkbox
                                    {...register('kk_user_remember_token')}
                                    id={`kk_user_remember_token`}
                                    name={`kk_user_remember_token`}
                                    label={`Запомнить меня`}
                                />
                            </Col>

                            <Col xs={12} lg={12}>
                                <InputError errors={login_errors} name={'g-recaptcha-response'} />
                                {login_error_messge && <Alert message={login_error_messge} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button`} loading={login_loading} disabled={login_loading}>Войти</Button>
                            </Col>
                            <Col lg={6}>
                                <Link to={`/password/forgot`}>Забыли пароль?</Link>
                            </Col>
                            <Col  lg={6}>
                                <Link to={`/registration`} className={`registration_page_login_link`}>Регистрация</Link>
                            </Col>
                        </Row>
                    </Form>
        </div>
    )
}

function mapStateToProps(state) {
    const {
        login_loading,
        login_message,
        login_errors,
        login_error_messge,
        user,
    } = state.auth;

    return {
        login_loading,
        login_message,
        login_errors,
        login_error_messge,
        user,
    };
}
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };