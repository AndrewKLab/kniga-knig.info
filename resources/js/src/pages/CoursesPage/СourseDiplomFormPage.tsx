import React, { FunctionComponent, useEffect, useCallback, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Label, TextInput, Alert, InputError, Form } from "../../../public/_components/UI";
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../_interfaces';
import { authActions, coursesUsersProgressActions } from "../../_actions";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import './index.css';


type СourseDiplomFormPageProps = {
    dispatch: any;
    user: User;
    send_course_diplom_loading: boolean;
    send_course_diplom_message: string | null;
    send_course_diplom_error: string | null;

    send_course_diplom_order_loading: boolean;
    send_course_diplom_order_message: string | null;
    send_course_diplom_order_errors: object | null;
    send_course_diplom_order_error_message: string | null;
}

const СourseDiplomFormPage: FunctionComponent<СourseDiplomFormPageProps> = ({
    dispatch,
    user,
    send_course_diplom_loading,
    send_course_diplom_message,
    send_course_diplom_error,

    send_course_diplom_order_loading,
    send_course_diplom_order_message,
    send_course_diplom_order_errors,
    send_course_diplom_order_error_message,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [searchParams] = useSearchParams();
    const [showForm, setShowForm] = useState(false);

    let kk_user_id = searchParams.get('kk_user_id');
    let kk_course_id = searchParams.get('kk_course_id');


    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('coursesDiplomForm');
        return token;
    }, [executeRecaptcha]);

    const onSubmitForgotPasswordForm = async (data) => {
        const token = await handleReCaptchaVerify();
        const res = await dispatch(coursesUsersProgressActions.send_course_diplom_order({ ...data, kk_cup_course_id: kk_course_id, "g-recaptcha-response": token }))
        setTimeout(() => navigate('/'), 3000)
    };

    const send_course_diplom_to_email = async () => {
        const res = await dispatch(coursesUsersProgressActions.send_course_diplom_to_email({ kk_cup_course_id: kk_course_id }))
    }

    return (
        <div className={`courses_diplom_page`}>
            <Row g={3}>
                <Col xs={12} sm={12} md={12} >
                    {showForm ? (
                        <Form className={`courses_diplom_form`} onSubmit={handleSubmit(onSubmitForgotPasswordForm)}>
                            <Row g={3}>

                                <Col xs={12} md={12}><h1 className={`courses_diplom_page_title text-primary`}>ПОЛУЧИТЬ ДИПЛОМ ОБ ОКОНЧАНИИ КУРСА</h1></Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="phonenumber">Номер телефона:</Label>
                                    <TextInput
                                        {...register('phonenumber')}
                                        type={`text`}
                                        id={`phonenumber`}
                                        name={`phonenumber`}
                                        placeholder={`Для уточнения деталей доставки.`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'phonenumber'} />
                                </Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="region">Область:</Label>
                                    <TextInput
                                        {...register('region', { required: true })}
                                        type={`text`}
                                        id={`region`}
                                        name={`region`}
                                        placeholder={`Введите область, например - (Московская обл.)`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'region'} />
                                </Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="city">Город:</Label>
                                    <TextInput
                                        {...register('city', { required: true })}
                                        type={`text`}
                                        id={`city`}
                                        name={`city`}
                                        placeholder={`Введите город, например - (Москва)`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'city'} />
                                </Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="street">Улица:</Label>
                                    <TextInput
                                        {...register('street', { required: true })}
                                        type={`text`}
                                        id={`street`}
                                        name={`street`}
                                        placeholder={`Введите улицу, например - (ул. Пушкина)`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'street'} />
                                </Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="house">Дом:</Label>
                                    <TextInput
                                        {...register('house', { required: true })}
                                        type={`text`}
                                        id={`house`}
                                        name={`house`}
                                        placeholder={`Введите дом, например - (д. 10)`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'house'} />
                                </Col>
                                <Col xs={12} md={12}>
                                    <Label htmlFor="apartment">Номер квартиры:</Label>
                                    <TextInput
                                        {...register('apartment')}
                                        type={`text`}
                                        id={`apartment`}
                                        name={`apartment`}
                                        placeholder={`Введите номер квартиры, например - (кв. 1)`}
                                    />
                                    <InputError errors={send_course_diplom_order_errors} name={'apartment'} />
                                </Col>

                                <Col xs={12} md={12}>
                                    <InputError errors={send_course_diplom_order_errors} name={'g-recaptcha-response'} />
                                    {send_course_diplom_order_message && <Alert message={send_course_diplom_order_message} type={'success'} />}
                                    {send_course_diplom_order_error_message && <Alert message={send_course_diplom_order_error_message} type={'danger'} />}
                                    <Button type={`submit`} className={`registration_page_button`} loading={send_course_diplom_order_loading} disabled={send_course_diplom_order_loading}>Отправить курьером</Button>
                                </Col>
                            </Row>
                        </Form>
                    ) : (
                        <React.Fragment>
                            <h1 className={`courses_diplom_page_title text-primary`}>ПОЛУЧИТЬ ДИПЛОМ ОБ ОКОНЧАНИИ КУРСА</h1>
                            <Button className={`courses_diplom_page_button`} onClick={() => setShowForm(!showForm)}>Курьером</Button>
                            <Button
                                className={`courses_diplom_page_button`}
                                disabled={send_course_diplom_loading}
                                loading={send_course_diplom_loading}
                                onClick={send_course_diplom_to_email}
                            >
                                Через Email
                            </Button>
                            {send_course_diplom_message ? <Alert type="success" message={send_course_diplom_message} /> : <React.Fragment></React.Fragment>}
                            {send_course_diplom_error ? <Alert type="danger" message={send_course_diplom_error} /> : <React.Fragment></React.Fragment>}
                        </React.Fragment>
                    )
                    }


                </Col>
            </Row>

        </div>
    )
}

function mapStateToProps(state) {
    const {
        user
    } = state.auth;
    const {
        send_course_diplom_loading,
        send_course_diplom_message,
        send_course_diplom_error,

        send_course_diplom_order_loading,
        send_course_diplom_order_message,
        send_course_diplom_order_errors,
        send_course_diplom_order_error_message,

    } = state.courses_users_progress;

    return {
        user,
        send_course_diplom_loading,
        send_course_diplom_message,
        send_course_diplom_error,

        send_course_diplom_order_loading,
        send_course_diplom_order_message,
        send_course_diplom_order_errors,
        send_course_diplom_order_error_message,
    };
}
const connectedСourseDiplomFormPage = connect(mapStateToProps)(СourseDiplomFormPage);
export { connectedСourseDiplomFormPage as СourseDiplomFormPage };