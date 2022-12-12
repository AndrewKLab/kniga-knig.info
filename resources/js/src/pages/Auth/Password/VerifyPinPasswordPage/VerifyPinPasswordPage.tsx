import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Label, TextInput, Checkbox, Alert, InputError } from '../../../../_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../../_interfaces';
import { authActions } from "../../../../_actions";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import './index.css';

type VerifyPinPasswordPageProps = {
    dispatch: any;
    user: User;
    forgot_password_message: string | null;

    verify_pin_password_loading: boolean;
    verify_pin_password_message: string | null;
    verify_pin_password_errors: object | null;
    verify_pin_password_error_message: string | null;
}

const VerifyPinPasswordPage: FunctionComponent<VerifyPinPasswordPageProps> = ({
    dispatch,

    user,
    forgot_password_message,


    verify_pin_password_loading,
    verify_pin_password_message,
    verify_pin_password_errors,
    verify_pin_password_error_message,
}): JSX.Element => {
    let navigate = useNavigate();
    let [urlSearchParams] = useSearchParams();
    const kk_user_email = urlSearchParams.get('kk_user_email');
    const { register, handleSubmit } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('verifyPinPassword');
        return token;
    }, [executeRecaptcha]);

    const onSubmitVerifyPinPasswordPageForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.verifyPinPassword({ ...data, "g-recaptcha-response": token }, navigate))
    };

    return (
        <div className={`verify_pin_password_page`}>
            <Row g={3}>
                <Col xs={12} sm={12} md={12} >
                    <form className={`registration_page_form`} onSubmit={handleSubmit(onSubmitVerifyPinPasswordPageForm)}>
                        <Row g={3}>

                            <Col xs={12} md={12}>
                                <h1 className={`registration_title text-primary`}>{user ? `Сменить пароль` : `Восстановление пароля`}</h1>
                                {forgot_password_message && <Alert message={forgot_password_message} type={'success'} />}
                            </Col>
                            <Col xs={12} md={12}>

                                <Label htmlFor="token">PIN:</Label>
                                <TextInput
                                    {...register('kk_user_email')}
                                    type={`hidden`}
                                    id={`kk_user_email`}
                                    name={`kk_user_email`}
                                    value={kk_user_email}
                                />
                                <TextInput
                                    {...register('token', { required: true })}
                                    type={`text`}
                                    id={`token`}
                                    name={`token`}
                                    placeholder={`Введите PIN-код...`}
                                />
                                <InputError errors={verify_pin_password_errors} name={'token'} />

                            </Col>

                            <Col xs={12} md={12}>
                                <InputError errors={verify_pin_password_errors} name={'g-recaptcha-response'} />
                                {verify_pin_password_error_message && <Alert message={verify_pin_password_error_message} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button`} loading={verify_pin_password_loading} disabled={verify_pin_password_loading}>Подтвердить</Button>
                            </Col>
                            <Col xs={12} md={12}>
                                <Link to={`/login`} className={`registration_page_login_link`}>Войти</Link>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>

        </div>
    )
}

function mapStateToProps(state) {
    const {
        user,
        forgot_password_message,

        verify_pin_password_loading,
        verify_pin_password_message,
        verify_pin_password_errors,
        verify_pin_password_error_message,

    } = state.auth;

    return {
        user,
        forgot_password_message,
        verify_pin_password_loading,
        verify_pin_password_message,
        verify_pin_password_errors,
        verify_pin_password_error_message,
    };
}
const connectedVerifyPinPasswordPage = connect(mapStateToProps)(VerifyPinPasswordPage);
export { connectedVerifyPinPasswordPage as VerifyPinPasswordPage };