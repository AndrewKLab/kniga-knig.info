import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { modalsActions } from "../../../public/_actions";
import { Image, Row, Col, Button } from '../../../public/_components/UI';
import './index.css';

const AboutUsPage: FunctionComponent = ({dispatch}): JSX.Element => {
    return (
        <div className={`about_us_page`}>
            <h1 className={`about_us_title`}>
                <div className={`text-primary`}>История</div>
                <div>Проекта</div>
            </h1>
            <Row g={3}>
                <Col xs={12} xl={7} className={`about_us_first_section`}>
                    <Image src={`site/Bible.png`} className={`about_us_first_section_img_bible`} />
                    <h2 className={`about_us_section_title`}>
                        <div className={`text-primary`}>Для чего</div>
                        этот проект?
                    </h2>
                    <p>Библия содержит исторические данные о древности. Последние открытия все больше и больше подтверждают, что Библия права и описывает факты, на самом деле имевшие место в истории земли и человечества. В Библии мы находим уже исполнившиеся пророчества о Египте (Иезекииль, 32:2-12); Вавилоне (Иеремия, 51:24-37), Греции (Даниил, 8:1-22), а также о других странах и исторических персонах.<Image src={`site/GirlWithPen.png`} className={`about_us_first_section_img_girl`} /> Кроме того, в Библии можно найти научные сведения, появившиеся в ней задолго до того, как они были открыты учеными: о круглой форме Земли (Исаия 40:22), о Земле как небесном теле (Иов 26:7), о том, что воздух имеет вес (Иов 28:25), о том, что невозможно посчитать звезды на небе (Иеремия 33:22), о круговороте воды в природе (Екклесиаст, 1:7) и другие. Следовательно, неразумно отвергать ее учение и стоит всерьез отнестись к свидетельству Библии о самой себе: она является источником истины (Иоанна 17:17), ее мерилом (Исаия 8:20) и вдохновлена Святым Духом (2 Петра 1:21).</p>
                </Col>
                <Col xs={12} xl={5} className={`about_us_first_section_2`}>
                    <Image src={`site/GirlWithPen.png`} />
                    <p>Библия обладает силой изменять жизнь (Евреям 4:12). Она приходит на помощь молодым и пожилым (Псалом 118:9; Псалом 91:15). Через чтение Библии мы приобщаемся к Богу (2 Петра 1:4). Поэтому для каждого человека важно изучать Библию и следовать ей (Иоанна 5:24).</p>
                </Col>
                <Col xs={12} xl={6} className={`about_us_second_section`}>
                    <Image src={`site/Bible.png`} className={`about_us_second_section_img_bible`} />
                </Col>
                <Col xs={12} xl={6} className={`about_us_second_section_2`}>
                    <h2 className={`about_us_section_title`}>
                        Как появился
                        <div className={`text-primary`}>наш проект?</div>
                    </h2>
                    <Image src={`site/BoyWithBible.png`} className={`about_us_second_section_2_img_boy`} />

                    <p>
                        «Библию не следует принимать всерьез» — заявил однажды во время занятий преподаватель. «А вы сами прочитали всю Библию?» — спросили его ученики. Преподавателю, застигнутому врасплох, пришлось признаться, что он эту книгу не изучал. Он понял, что нельзя так категорично высказываться о книге, с которой по-настоящему не знаком. Учитель решил прочитать Библию, чтобы составить мнение о ней. После изучения Священного Писания преподаватель стал верующим.<br />
                        <br />
                        Во всех странах существуют сказки и легенды, где рассказывается о волшебных кошельках, сколько бы раз человек ни доставал оттуда монеты, в них всегда остаются деньги. Священное Писание не легенда, но действительно обладает схожими «чудесными» свойствами. Каждый раз, открывая ее страницы, мы находим для себя что-то новое, важное, нужное нам.
                    </p>
                    <Button className="mt-3 w-100" onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать сайт</Button>
                </Col>
            </Row>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {user};
}
const connectedAboutUsPage = connect(mapStateToProps)(AboutUsPage);
export { connectedAboutUsPage as AboutUsPage };