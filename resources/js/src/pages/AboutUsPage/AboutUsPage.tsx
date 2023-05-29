import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { modalsActions } from "../../../public/_actions";
import { Image, Row, Col, Button } from '../../../public/_components/UI';
import './index.css';
import { PartnerIcon1, PartnerIcon2, PartnerIcon3 } from "../../../public/_components/UI/Icons";

const AboutUsPage: FunctionComponent = ({ dispatch }): JSX.Element => {
    return (
        <div className={`about_us_page`}>
            <div className={`about_us_page_shadows`}>

            </div>
            <div className="about_us_page_shadow_1"></div>
            <div className="about_us_page_shadow_2"></div>
            <div className="about_us_page_shadow_3"></div>
            <div className="about_us_page_shadow_4"></div>
            <div className="about_us_page_shadow_5"></div>
            <Row g={3} className={`about_us_page_first_row`}>
                <Col xs={12} lg={12} className={`about_us_title_container`}>
                    <h2 className={`about_us_title`}>
                        <div className={`text-primary`}>Для чего</div>
                        <div> этот проект?</div>
                    </h2>
                </Col>
                <Col xs={12} lg={7} className={`d-flex align-items-center about_us_page_text`}>
                    <p className={`mt-3`}>Если Бог добр, то почему вокруг столько несправедливости? В чем смысл жизни? Где найти радость в неспокойном мире? Как и зачем молиться? Как быть с разочарованием в вере? Где вы ищете ответы на такие сложные вопросы? Мы нашли их в Библии. Она дает нам опору в жизни, избавляет от страха и неизвестности, открывает законы успешных отношений. Через Библию мы узнали Бога, и хотим поделиться своей радостью с миром.</p>
                </Col>
                <Col xs={12} lg={5}>
                    <Image src={`site/about_us_1 (2).webp`} className={`about_us_first_section_image`} />
                </Col>
            </Row>
            <Row g={3} className={`about_us_page_who_we_row`}>
                <Col xs={12} lg={7} className={`about_us_page_who_we_image_section`}>
                    <Image src={`site/about_us_2 1.webp`} className={`about_us_page_who_we_image`} />
                    <p>Более 30 лет Заокский университет помогает людям профессионально изучать Библию</p>
                </Col>
                <Col xs={12} lg={5} className={`about_us_first_section`}>
                    <h2 className={`about_us_section_title`}>
                        <span className={`text-primary`}>КТО</span> МЫ
                    </h2>

                    <p>Мы, команда Радиотелецентра «Голос надежды», с 1990 года служим обществу и знакомим людей с живым Богом, который реально действует в жизни любого человека.</p><br />
                    <p>На этом сайте вы найдете бесплатные курсы, которые помогут вам найти ответы на свои вопросы и увидеть силу Божьего Слова.</p><br />
                    <p>Уроки составлены преподавателями Заокского Университета и опытными богословами.</p><br />
                    <p>В нашей Школе Библии уже обучились тысячи желающих постигнуть тайны Библии.</p><br />
                    <p>Присоединяйтесь!</p>
                </Col>

            </Row>
            <Row g={3} className={`about_us_page_partners_row`}>
                <Col xs={12} lg={12} >
                    <h2 className={`about_us_section_title`}>
                        <span className={`text-primary`}>наши </span>партнеры
                    </h2>
                </Col>
                <Col xs={12} lg={4} >
                    <a href="https://hopetv.ru/" target="_blank">
                        <PartnerIcon1 size={70} />
                        <p className={`about_us_page_partner_title`}>Телеканал “НАДЕЖДА”</p>
                    </a>
                </Col>
                <Col xs={12} lg={4} >
                    <a href="https://zda.zau.ru/" target="_blank">
                        <PartnerIcon2 size={70} />
                        <p className={`about_us_page_partner_title`}>Заокский адвентистский университет</p>
                    </a>
                </Col>
                <Col xs={12} lg={4} >
                    <a href="https://lifesource.ru/" target="_blank">
                        <PartnerIcon3 size={70} />
                        <p className={`about_us_page_partner_title`}>Издательство “Источник Жизни”</p>
                    </a>
                </Col>
            </Row>
            <Row g={3}>
                <Col xs={12} lg={12} >
                    <div className="about_us_page_documents_container">
                        <Image src={`site/diplom_1.webp`} className={`about_us_page_documents_image cursor-pointer`} height={218} onClick={() => dispatch(modalsActions.openImageModal(true, `site/diplom_1.webp`))} />
                    </div>
                    <div className="about_us_page_documents_container">
                        <Image src={`site/diplom_2.webp`} className={`about_us_page_documents_image cursor-pointer`} onClick={() => dispatch(modalsActions.openImageModal(true, `site/diplom_2.webp`))} />
                        <Image src={`site/diplom_3.webp`} className={`about_us_page_documents_image cursor-pointer`} onClick={() => dispatch(modalsActions.openImageModal(true, `site/diplom_3.webp`))} />
                        <Image src={`site/diplom_4.webp`} className={`about_us_page_documents_image cursor-pointer`} onClick={() => dispatch(modalsActions.openImageModal(true, `site/diplom_4.webp`))} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
const connectedAboutUsPage = connect(mapStateToProps)(AboutUsPage);
export { connectedAboutUsPage as AboutUsPage };