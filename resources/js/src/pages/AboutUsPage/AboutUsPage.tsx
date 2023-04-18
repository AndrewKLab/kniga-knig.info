import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { modalsActions } from "../../../public/_actions";
import { Image, Row, Col, Button } from '../../../public/_components/UI';
import './index.css';

const AboutUsPage: FunctionComponent = ({ dispatch }): JSX.Element => {
    return (
        <div className={`about_us_page`}>
            {/* <h1 className={`about_us_title`}>
                <div className={`text-primary`}>ДЛЯ ЧЕГО</div>
                <div>НАШ ПРОЕКТ</div>
            </h1> */}
            <Row g={3}>
                <Col xs={12} lg={7} className={`about_us_first_section`}>
                    {/* <Image src={`site/Bible.png`} className={`about_us_first_section_img_bible`} /> */}
                    <h2 className={`about_us_section_title`}>
                        <div className={`text-primary`}>Для чего</div>
                        этот проект?
                    </h2>
                    <p>Если Бог добр, то почему вокруг столько несправедливости? В чем смысл жизни? Где найти радость в неспокойном мире? Как и зачем молиться? Как быть с разочарованием в вере?
                        Где вы ищете ответы на такие сложные вопросы?
                        Мы нашли их в Библии. Она дает нам опору в жизни, избавляет от страха и неизвестности, открывает законы успешных отношений. Через Библию мы узнали Бога, и хотим поделиться своей радостью с миром.
                    </p>
                </Col>
                <Col xs={12} lg={5} className={`about_us_first_section_2`}>
                    <Image src={`site/about_us_1.webp`} />
                </Col>
                <Col xs={12} lg={7} className={`about_us_first_section`}>
                    <h2 className={`about_us_section_title`}>
                        <div className={`text-primary`}>КТО МЫ</div>
                    </h2>
                    {/* <Image src={`site/BoyWithBible.png`} className={`about_us_second_section_2_img_boy`} /> */}

                    <p>Мы — христианская медиа компания Голос Надежды. Радио, телеканал, Школа Библии и Контакт-центр. Многие годы мы служим обществу, рассказывая о Боге и помогая увидеть Его в жизни.</p><br/>
                    <p>На этом сайте вы найдете бесплатные курсы, которые помогут вам найти ответы на свои вопросы и увидеть силу Божьего Слова.</p><br/>
                    <p>Уроки составлены преподавателями Заокского Университета, профессорами богословских наук. Они же проконсультируют вас по вопросам, возникающим во время обучения.</p><br/>
                    <b>В нашей Школе Библии обучились уже десятки тысяч человек. Присоединяйтесь!</b>
                    {/* <Button className="mt-3 w-100" onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать сайт</Button> */}
                </Col>
                <Col xs={12} lg={5} className={`about_us_first_section_2`}>
                    <Image src={`site/about_us_2.webp`} />
                    <p>Более 30 лет Заокский университет помогает людям профессионально изучать Библию</p>
                </Col>

                <Col xs={12} lg={12}>
                    <Image src={`site/about_us_3.webp`} />
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