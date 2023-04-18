import React, { FunctionComponent, useEffect, useCallback, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Label, TextInput, InputGroup, InputError, Checkbox, Alert, Form } from '../../../../public/_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../_interfaces';
import { authActions } from "../../../_actions";
import { useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import './index.css';
// import { EyeOutlineIcon } from "../../../../public/_components/UI/Icons/EyeOutlineIcon";
import { EyeOffOutlineIcon, EyeOutlineIcon } from "../../../../public/_components/UI/Icons";
import { GoogleAuthButton, OdniklassnikiAuthButton, VKAuthButton } from "../../../../public/_components";

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
    const [togglePasswordShow, setTogglePasswordShow] = useState(false)
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    let { type } = useParams();
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (user) navigate('/');
        if (type) {
            const params = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            const referal_user = localStorage.getItem('referal_user')
            if(referal_user) params['referal_user'] = referal_user
            switch (type) {
                case 'google':
                    dispatch(authActions.googleAuthCallback(params, navigate))
                    break;
                case 'vkontakte':
                    dispatch(authActions.vkontakteAuthCallback(params, navigate))
                    break;
                case 'odnoklassniki':
                    dispatch(authActions.odnoklassnikiAuthUrlAuthCallback(params, navigate))
                    break;

                default:
                    break;
            }
        }


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
            <Row g={3}>
                {/* <Col xs={12} sm={12} md={6} >
                    <Image src={`/site/signin.png`} className={`registration_page_image`} style={{ minHeight: '600px' }} alt="sign-up" />
                </Col> */}
                <Col xs={12} sm={12} md={12} >
                    <Form className={`login_page_form`} onSubmit={handleSubmit(onSubmitLoginForm)}>
                        <Row g={3}>
                            <Col xs={12} md={12}><h1 className={`registration_title text-primary`}>Вход</h1></Col>
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
                            <Col xs={12} md={12}>
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
                                        {togglePasswordShow ? <EyeOffOutlineIcon color={'#fff'} /> : <EyeOutlineIcon color={'#fff'} />}
                                    </Button>
                                </InputGroup>

                                <InputError errors={login_errors} name={'kk_user_password'} />
                            </Col>
                            <Col xs={12} md={12}>
                                <Checkbox
                                    {...register('kk_user_remember_token')}
                                    id={`kk_user_remember_token`}
                                    name={`kk_user_remember_token`}
                                    label={`Запомнить меня`}
                                />
                            </Col>

                            <Col xs={12} md={12}>
                                <InputError errors={login_errors} name={'g-recaptcha-response'} />
                                {login_error_messge && <Alert message={login_error_messge} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button`} loading={login_loading} disabled={login_loading}>Войти</Button>
                            </Col>
                            <Col xs={12} md={6}>
                                <Link to={`/password/forgot`}>Забыли пароль?</Link>
                            </Col>
                            <Col xs={12} md={6}>
                                <Link to={`/registration`} className={`registration_page_login_link`}>Регистрация</Link>
                            </Col>
                            <Col xs={12} md={12}>
                                <GoogleAuthButton className={`mb-3`}>Войти c помощью Google</GoogleAuthButton>
                                <VKAuthButton className={`mb-3`}>Войти c помощью VK</VKAuthButton>
                                <OdniklassnikiAuthButton>Войти c помощью OK</OdniklassnikiAuthButton>
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