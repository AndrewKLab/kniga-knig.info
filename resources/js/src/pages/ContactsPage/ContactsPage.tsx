import React, { FunctionComponent, useCallback } from "react";
import { Image, Row, Col, TextInput, TextArea, Button, InputError, Form, Alert } from '../../_components/UI';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './index.css';
import { supportActions } from "../../_actions";
import { User } from "../../_interfaces";
import { connect } from 'react-redux';

type ContactsPageProps = {
    dispatch: any;

    create_support_loading: boolean;
    create_support_message: string | null;
    create_support_errors: object | null;
    create_support_error_message: string | null;
    user: User;
}

const ContactsPage: FunctionComponent<ContactsPageProps> = ({
    dispatch,
    user,
    create_support_loading,
    create_support_message,
    create_support_errors,
    create_support_error_message,
}): JSX.Element => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('contact_us');
        return token;
    }, [executeRecaptcha]);

    const onSubmitContactForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(supportActions.create({ ...data, "g-recaptcha-response": token }))
        reset()
    };

    return (
        <div className={`contacts_page`}>
            <h1 className={`contacts_page_title`}>
                <div className={`text-primary`}>Свяжитесь</div>
                <div>с нами</div>
            </h1>
            <Row g={3} className={`contacts_page_row`}>
                <Col xs={12} xl={7} className={`contacts_page_first_section`}>
                    <Image src={`site/up_contact.png`} className={`contacts_page_first_section_img`} />
                    <p className={`contacts_page_first_section_text`}>Если у вас возникли вопросы, отправьте его через данную форму и мы вам ответим</p>
                    <Form className={`contacts_page_first_section_form`} onSubmit={handleSubmit(onSubmitContactForm)}>
                        {user &&
                            <TextInput
                                {...register('kk_support_user_id')}
                                type={`hidden`}
                                id={`kk_support_user_id`}
                                name={`kk_support_user_id`}
                                value={user.kk_user_id}
                            />
                        }

                        <TextInput
                            {...register('kk_support_type_id')}
                            type={`hidden`}
                            id={`kk_support_type_id`}
                            name={`kk_support_type_id`}
                            value={'1'}
                        />
                        <InputError errors={create_support_errors} name={'kk_support_name'} />
                        <TextInput
                            {...register('kk_support_name')}
                            type={`text`}
                            id={`kk_support_name`}
                            name={`kk_support_name`}
                            placeholder={`Ваше имя`}
                        />
                        <InputError errors={create_support_errors} name={'kk_support_email'} />
                        <TextInput
                            {...register('kk_support_email')}
                            type={`email`}
                            id={`kk_support_email`}
                            name={`kk_support_email`}
                            placeholder={`E-mail`}
                        />
                        <InputError errors={create_support_errors} name={'kk_support_subject'} />
                        <TextInput
                            {...register('kk_support_subject')}
                            type={`text`}
                            id={`kk_support_subject`}
                            name={`kk_support_subject`}
                            placeholder={`Тема`}
                        />
                        <InputError errors={create_support_errors} name={'kk_support_message'} />
                        <TextArea
                            {...register('kk_support_message')}
                            rows={4}
                            id={`kk_support_message`}
                            name={`kk_support_message`}
                            placeholder={`Сообщение`}
                        />
                        <InputError errors={create_support_errors} name={'g-recaptcha-response'} />
                        {create_support_message && <Alert message={create_support_message} type={'success'} />}
                        {create_support_error_message && <Alert message={create_support_error_message} type={'danger'} />}
                        <Button className={`contacts_page_first_section_form_button`} type={`submit`} loading={create_support_loading} disabled={create_support_loading}>Отправить</Button>
                    </Form>
                </Col>
                <Col xs={12} xl={5} className={`contacts_page_second_section`}>
                    <h2 className={`contacts_page_section_title`}>Наши <span className={`text-primary`}>контакты</span></h2>
                    <ul>
                        <li><b>Адрес:</b> г. Тула, ул. Станиславского, д. 48</li>
                        <li><b>Горячая линия:</b> <a href="tel:88001001844">8 (800) 100 18 44</a></li>
                        <li><b>E-mail:</b> <a href="mailto:contact@kniga-knig.info">contact@kniga-knig.info</a></li>
                    </ul>
                    <iframe className={`contacts_page_second_section_map`} src="https://yandex.ru/map-widget/v1/?um=constructor%3A4f021669817283c358bd66f69b1168a605ce30c85ba408126f8182f81ce85ec7&amp;source=constructor" width="100%" height="530" frameBorder="0"></iframe>
                </Col>
            </Row>
        </div>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        create_support_loading,
        create_support_message,
        create_support_errors,
        create_support_error_message,
    } = state.support;

    return {
        user,
        create_support_loading,
        create_support_message,
        create_support_errors,
        create_support_error_message,
    };
}
const connectedContactsPage = connect(mapStateToProps)(ContactsPage);
export { connectedContactsPage as ContactsPage };
