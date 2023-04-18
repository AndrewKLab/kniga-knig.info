import moment from "moment";
import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../_helpers";
import { Button, Checkbox, Col, Form, InputError, Label, Modal, ModalActions, ModalBody, ModalHeader, Row, Share, TextInput } from "../../../public/_components/UI";
import { DonateButton } from "../DonateButton";
import { useForm } from "react-hook-form";

export interface DonateModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;

}

const DonateModal: FunctionComponent<DonateModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,


    ...other
}) => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmitDonateForm = async (data) => {
        console.log(data)
        var widget = new cp.CloudPayments();


        var auto = data.reccurent.checked //проверка

        if (auto) { //включаем подписку
            data.CloudPayments = {
                recurrent: { interval: 'Month', period: 1 } //один раз в месяц начиная со следующего месяца
            }
        }

        var amount = parseFloat(data.amount);
        // var accountId = data.email;

        widget.charge({ // options
            publicId: 'pk_c7e901dc17201762a41e6c5e5beb6', //id из личного кабинета
            description: 'Пожертвование на уставную деятельность АНО РТЦ "Голос надежды"', //назначение
            amount: amount, //сумма
            currency: 'RUB', //валюта
            // accountId: accountId, //идентификатор плательщика (обязательно для создания подписки)
            // email: accountId,
            data: data,
            applePaySupport: true,
            googlePaySupport: true,
            yandexPaySupport: true,
            tinkoffInstallmentSupport: true,
        },
            function (options) { // success
                setIsOpen(false)
            },
            function (reason, options) { // fail
                //действие при неуспешной оплате
            });

    };

    return isOpen ?
        <Modal centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form onSubmit={handleSubmit(onSubmitDonateForm)}>
                <ModalHeader setIsOpen={setIsOpen}>Поддержать сайт</ModalHeader>
                <ModalBody>
                    <Row g={3}>
                        {/* <Col xs={12} md={6}>
                            <Label htmlFor="lastName">Фамилия:</Label>
                            <TextInput
                                {...register('lastName')}
                                type={`text`}
                                id={`lastName`}
                                name={`lastName`}
                                placeholder={`Введите фамилию...`}
                            />

                        </Col>
                        <Col xs={12} md={6}>
                            <Label htmlFor="name">Имя:</Label>
                            <TextInput
                                {...register('name')}
                                type={`text`}
                                id={`name`}
                                name={`name`}
                                placeholder={`Введите имя...`}
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Label htmlFor="email">E-mail:</Label>
                            <TextInput
                                {...register('email')}
                                type={`email`}
                                id={`email`}
                                name={`email`}
                                placeholder={`Введите E-mail...`}
                            />
                        </Col> */}
                        <Col xs={12} md={12}>
                            <Label htmlFor={`amount`}>Сумма:</Label>
                            <TextInput
                                {...register('amount')}
                                type={`text`}
                                id={`amount`}
                                name={`amount`}
                                placeholder={`Введите сумму...`}
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Checkbox
                                {...register('reccurent')}
                                id={`reccurent`}
                                name={`reccurent`}
                                label={<React.Fragment>Поддерживать ежемесячно</React.Fragment>}
                            />
                        </Col>
                        <Col xs={12} md={12}>
                            <Checkbox
                                {...register('privacy_politic_confirmation')}
                                id={`privacy_politic_confirmation`}
                                name={`privacy_politic_confirmation`}
                                label={<React.Fragment>Нажимая кнопку «Поддержать», я даю согласие на обработку своих персональных данных и принимаю <Link to={`/confidential`} target="_blank" className={`link`}>Политику конфиденциальности</Link>.</React.Fragment>}
                            />
                        </Col>
                    </Row>


                </ModalBody>
                <ModalActions>
                    <Button color={'primary'} type={`submit`}>Поддержать</Button>
                </ModalActions>
            </Form>
        </Modal> : null
}

function mapStateToProps(state) {
    const {

    } = state.lessons_users_progress;
    return {

    };
}
const connectedDonateModal = connect(mapStateToProps)(DonateModal);
export { connectedDonateModal as DonateModal };