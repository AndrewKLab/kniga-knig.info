import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Label, TextInput, Checkbox, Alert, InputError, Form } from '../../../../_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../../_interfaces';
import { authActions } from "../../../../_actions";
import { useNavigate, Link } from "react-router-dom";
import './index.css';

type ForgotPasswordPageProps = {
    dispatch: any;
    user: User;
    forgot_password_loading: boolean;
    forgot_password_message: string | null;
    forgot_password_errors: object | null;
    forgot_password_error_message: string | null;

}

const ForgotPasswordPage: FunctionComponent<ForgotPasswordPageProps> = ({
    dispatch,
    user,
    forgot_password_loading,
    forgot_password_message,
    forgot_password_errors,
    forgot_password_error_message,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('forgotPassword');
        return token;
    }, [executeRecaptcha]);

    const onSubmitForgotPasswordForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.forgotPassword({ ...data, "g-recaptcha-response": token }, navigate))
    };

    return (
        <div className={`forgot_password_page`}>
            <Row g={3}>
                <Col xs={12} sm={12} md={12} >
                    <Form className={`registration_page_form`} onSubmit={handleSubmit(onSubmitForgotPasswordForm)}>
                        <Row g={3}>

                            <Col xs={12} md={12}><h1 className={`registration_title text-primary`}>Забыли пароль?</h1></Col>
                            <Col xs={12} md={12}>
                                <Label htmlFor="kk_user_email">E-mail:</Label>
                                <TextInput
                                    {...register('kk_user_email', { required: true })}
                                    type={`email`}
                                    id={`kk_user_email`}
                                    name={`kk_user_email`}
                                    placeholder={`Введите E-mail...`}
                                />
                                <InputError errors={forgot_password_errors} name={'kk_user_email'} />
                            </Col>

                            <Col xs={12} md={12}>
                                <InputError errors={forgot_password_errors} name={'g-recaptcha-response'} />
                                {forgot_password_error_message && <Alert message={forgot_password_error_message} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button`} loading={forgot_password_loading} disabled={forgot_password_loading}>Подтвердить</Button>
                            </Col>
                            <Col xs={12} md={12}>
                                <Link to={`/login`} className={`registration_page_login_link`}>Войти</Link>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </div>
    )
}

function mapStateToProps(state) {
    const {
        user,
        forgot_password_loading,
        forgot_password_message,
        forgot_password_errors,
        forgot_password_error_message,
    } = state.auth;

    return {
        user,
        forgot_password_loading,
        forgot_password_message,
        forgot_password_errors,
        forgot_password_error_message,
    };
}
const connectedForgotPasswordPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage };