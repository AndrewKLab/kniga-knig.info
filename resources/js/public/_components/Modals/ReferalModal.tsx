import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Button, Col, Image, Modal, ModalBody, ModalHeader, Row, } from "../../../public/_components/UI";
import './index.css'
import { ChevronRightIcon } from "../UI/Icons";


export interface ReferalModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    isOpen: boolean;
    setIsOpen: any;
}

const ReferalModal: FunctionComponent<ReferalModalProps> = ({
    children,
    className,

    isOpen,
    setIsOpen,
    ...other
}) => {


    return isOpen ?
        <Modal className={`referal-modal home_page_second_green_block`} centered isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader setIsOpen={setIsOpen}></ModalHeader>
            <ModalBody>
                <Row g={3}>
                    <Col xs={12} lg={6}>
                        <Image src={`site/Rustem 3 1.png`} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className={`referal-modal-title`}>
                            <span className={`text-primary`}>РУСТЕМ </span>МУХАМЕТВАЛЕЕВ
                        </div>
                        <div className={`referal-modal-sub-title`}>Директор РТЦ “Голос надежды” </div>
                        <p className={`referal-modal-text`}>
                            Дорогой друг!
                            <br /><br />
                            Мы рады приветствовать Вас на нашем портале
                            “Книга книг”! Наши курсы Библии проводятся опытными преподавателями, которые помогут вам глубже понять Священное Писание и применить Его учение в повседневной жизни. Регистрация открыта, будем рады видеть вас на наших курсах.
                        </p>
                        <Button className={`home_page_second_button home_page_second_button_with_chevron mt-3`} onClick={() => setIsOpen(false)}>
                            Начать обучение
                            <ChevronRightIcon className="home_page_second_button_icon"></ChevronRightIcon>
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal> : null
}

function mapStateToProps(state) {
    const {
        image_modal_src
    } = state.modals;
    return {
        image_modal_src
    };
}
const connectedReferalModal = connect(mapStateToProps)(ReferalModal);
export { connectedReferalModal as ReferalModal };