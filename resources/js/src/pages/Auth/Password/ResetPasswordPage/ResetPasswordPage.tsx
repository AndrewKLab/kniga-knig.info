import React, { FunctionComponent,  useCallback, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Label, TextInput, Alert, InputError, InputGroup } from '../../../../../public/_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../../_interfaces';
import { authActions } from "../../../../_actions";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import './index.css';
import { EyeOffOutlineIcon, EyeOutlineIcon } from "../../../../../public/_components/UI/Icons";

type ResetPasswordPageProps = {
    dispatch: any;
    user: User;
    verify_pin_password_message: string | null;

    reset_password_loading: boolean;
    reset_password_message: string | null;
    reset_password_errors: object | null;
    reset_password_error_messge: string | null;
}

const ResetPasswordPage: FunctionComponent<ResetPasswordPageProps> = ({
    dispatch,

    user,
    verify_pin_password_message,

    reset_password_loading,
    reset_password_message,
    reset_password_errors,
    reset_password_error_messge,

}): JSX.Element => {
    const [togglePasswordShow, setTogglePasswordShow] = useState(false);
    const [togglePasswordConfirmShow, setTogglePasswordConfirmShow] = useState(false);
    let navigate = useNavigate();
    let [urlSearchParams] = useSearchParams();
    const kk_user_email = urlSearchParams.get('kk_user_email');
    const token = urlSearchParams.get('token');
    const { register, handleSubmit } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('resetPassword');
        return token;
    }, [executeRecaptcha]);

    const onSubmitResetPasswordPageForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.resetPassword({ ...data, "g-recaptcha-response": token }, navigate))
    };

    return (
        <div className={`verify_pin_password_page`}>
            <Row g={3}>
                <Col xs={12} sm={12} md={12} >
                    <form className={`registration_page_form`} onSubmit={handleSubmit(onSubmitResetPasswordPageForm)}>
                        <Row g={3}>

                            <Col xs={12} md={12}>
                                <h1 className={`registration_title text-primary`}>{user ? `Сменить пароль` : `Восстановление пароля`}</h1>
                                {verify_pin_password_message && <Alert message={verify_pin_password_message} type={'success'} />}
                            </Col>
                            <Col xs={12} md={6}>
                                <TextInput
                                    {...register('kk_user_email')}
                                    type={`hidden`}
                                    id={`kk_user_email`}
                                    name={`kk_user_email`}
                                    value={kk_user_email}
                                />
                                <TextInput
                                    {...register('token', { required: true })}
                                    type={`hidden`}
                                    id={`token`}
                                    name={`token`}
                                    value={token}
                                />

                                <Label htmlFor="kk_user_password">Пароль:</Label>
                                <InputGroup>
                                    <TextInput
                                        {...register('kk_user_password')}
                                        type={togglePasswordShow ? `text` : `password`}
                                        id={`kk_user_password`}
                                        name={`kk_user_password`}
                                        placeholder={`Введите Пароль...`}
                                    />
                                    <Button className="w-auto" color="primary" onClick={() => setTogglePasswordShow(!togglePasswordShow)}>
                                    {togglePasswordShow ? <EyeOffOutlineIcon color={'#fff'} /> : <EyeOutlineIcon  color={'#fff'} />}
                                    </Button>
                                </InputGroup>
                                <InputError errors={reset_password_errors} name={'kk_user_password'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_password_confirmation">Подтвердите пароль:</Label>
                                <InputGroup>
                                    <TextInput
                                        {...register('kk_user_password_confirmation')}
                                        type={togglePasswordConfirmShow ? `text` : `password`}
                                        id={`kk_user_password_confirmation`}
                                        name={`kk_user_password_confirmation`}
                                        placeholder={`Введите Пароль еще раз...`}
                                    />
                                    <Button className="w-auto" color="primary" onClick={() => setTogglePasswordConfirmShow(!togglePasswordConfirmShow)}>
                                        {togglePasswordConfirmShow ? <EyeOffOutlineIcon color={'#fff'} /> : <EyeOutlineIcon  color={'#fff'} />}
                                    </Button>
                                </InputGroup>
                                <InputError errors={reset_password_errors} name={'kk_user_password_confirmation'} />
                            </Col>



                            <Col xs={12} md={12}>
                                <InputError errors={reset_password_errors} name={'g-recaptcha-response'} />
                                {reset_password_error_messge && <Alert message={reset_password_error_messge} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button`} loading={reset_password_loading} disabled={reset_password_loading}>Подтвердить</Button>
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
        verify_pin_password_message,

        reset_password_loading,
        reset_password_message,
        reset_password_errors,
        reset_password_error_messge,

    } = state.auth;

    return {
        user,
        verify_pin_password_message,
        reset_password_loading,
        reset_password_message,
        reset_password_errors,
        reset_password_error_messge,
    };
}
const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage };