import React, { FunctionComponent, useEffect, useCallback, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Label, TextInput, Checkbox, InputGroup, InputGroupText, InputError, Alert, Form } from '../../../_components/UI';
import { TimerOutlineIcon, FolderOutlineIcon } from '../../../_components/UI/Icons';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../_interfaces';
import { authActions } from "../../../_actions";
import { useNavigate, Link } from "react-router-dom";
import './index.css';
import { EyeOffOutlineIcon, EyeOutlineIcon } from "../../../../public/_components/UI/Icons";

type RegistrationPageProps = {
    dispatch: any;
    user: User;
    registration_loading: boolean,
    registration_message: string | null,
    registration_errors: object | null,
    registration_error_message: string | null,
}

const RegistrationPage: FunctionComponent<RegistrationPageProps> = ({
    dispatch,
    user,
    registration_loading,
    registration_message,
    registration_errors,
    registration_error_message,
}): JSX.Element => {
    const [togglePasswordShow, setTogglePasswordShow] = useState(false);
    const [togglePasswordConfirmShow, setTogglePasswordConfirmShow] = useState(false);
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('registration');
        return token;
    }, [executeRecaptcha]);

    const onSubmitRegistrationForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.registration({ ...data, "g-recaptcha-response": token }, navigate))
    }


    return (
        <div className={`registration_page`}>
                    <Form className={`registration_page_form`} onSubmit={handleSubmit(onSubmitRegistrationForm)}>
                        <Row g={3}>

                            <Col xs={12} md={12}><h1 className={`registration_title text-primary`}>Регистрация</h1></Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_lastname">Фамилия:</Label>
                                <TextInput
                                    {...register('kk_user_lastname')}
                                    type={`text`}
                                    id={`kk_user_lastname`}
                                    name={`kk_user_lastname`}
                                    placeholder={`Введите фамилию...`}
                                />
                                <InputError errors={registration_errors} name={'kk_user_lastname'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_firstname">Имя:</Label>
                                <TextInput
                                    {...register('kk_user_firstname')}
                                    type={`text`}
                                    id={`kk_user_firstname`}
                                    name={`kk_user_firstname`}
                                    placeholder={`Введите имя...`}
                                />
                                <InputError errors={registration_errors} name={'kk_user_firstname'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_country">Страна:</Label>
                                <TextInput
                                    {...register('kk_user_country')}
                                    type={`text`}
                                    id={`kk_user_country`}
                                    name={`kk_user_country`}
                                    placeholder={`Введите страну...`}
                                />
                                <InputError errors={registration_errors} name={'kk_user_country'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_sity">Город:</Label>
                                <TextInput
                                    {...register('kk_user_sity')}
                                    type={`text`}
                                    id={`kk_user_sity`}
                                    name={`kk_user_sity`}
                                    placeholder={`Введите город...`}
                                />
                                <InputError errors={registration_errors} name={'kk_user_sity'} />
                            </Col>
                            <Col xs={12} md={12}>
                                <Label htmlFor="kk_user_email">E-mail:</Label>
                                <TextInput
                                    {...register('kk_user_email')}
                                    type={`email`}
                                    id={`kk_user_email`}
                                    name={`kk_user_email`}
                                    placeholder={`Введите E-mail...`}
                                />
                                <InputError errors={registration_errors} name={'kk_user_email'} />
                            </Col>
                            <Col xs={12} md={12}>
                                <Label htmlFor="kk_user_phonenumber">Номер телефон:</Label>
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
                                <span>Номер телефона необходимо вводить без страны (8, +7 и тд.).</span><br/>
                                <InputError errors={registration_errors} name={'kk_user_phonenumber'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_password">Пароль*:</Label>
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
                                <InputError errors={registration_errors} name={'kk_user_password'} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Label htmlFor="kk_user_password_confirmation">Подтвердите пароль*:</Label>
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
                                <InputError errors={registration_errors} name={'kk_user_password_confirmation'} />
                            </Col>
                            <Col xs={12} md={12}>
                                <Checkbox
                                    {...register('kk_user_password_privacy_politic_confirmation')}
                                    id={`kk_user_password_privacy_politic_confirmation`}
                                    name={`kk_user_password_privacy_politic_confirmation`}
                                    label={<React.Fragment>Нажимая кнопку «Зарегистрироваться», я даю согласие на обработку своих персональных данных и принимаю <Link to={`/confidential`} target="_blank">Политику конфиденциальности</Link>.</React.Fragment>}
                                />
                                <InputError errors={registration_errors} name={'kk_user_password_privacy_politic_confirmation'} />
                            </Col>


                            <Col xs={12} md={12}>
                                <InputError errors={registration_errors} name={'g-recaptcha-response'} />
                                {registration_error_message && <Alert message={registration_error_message} type={'danger'} />}
                                <Button type={`submit`} className={`registration_page_button w-100`} loading={registration_loading} disabled={registration_loading}>Зарегистрироваться</Button>
                            </Col>
                            <Col xs={12} md={12}>
                                <Link to={`/login`} className={`registration_page_login_link`}>Уже есть аккаунт? Войти</Link>
                            </Col>
                        </Row>
                    </Form>
        </div>
    )
}

function mapStateToProps(state) {
    const {
        user,
        registration_loading,
        registration_message,
        registration_errors,
        registration_error_message,
    } = state.auth;

    return {
        user,
        registration_loading,
        registration_message,
        registration_errors,
        registration_error_message,
    };
}
const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };