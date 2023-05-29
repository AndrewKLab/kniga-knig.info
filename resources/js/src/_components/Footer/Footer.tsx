import React, { FunctionComponent } from "react";
import { Container, Row, Col, IconButton } from '../../../public/_components/UI';
import { OKIcon, TelegramIcon, VKIcon, YandexZenIcon, YouTubeIcon } from "../../../public/_components/UI/Icons";
import { useNavigate } from "react-router-dom";
import './index.css'

type FooterProps = {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({ children, className }): JSX.Element => {
    let navigate = useNavigate();
    const SocialIcons = () => {
        const iconStyle = {
            padding: "10px",
            borderRadius: "10px",
        }
        return <React.Fragment>
            <a className={`social_icon_link`} href={`https://t.me/knigaknigcourses`} target="_blank" style={iconStyle}><TelegramIcon size={20} color={`rgba(var(--primary-color), 1)`} /></a>
            <a className={`social_icon_link`} href={`https://www.youtube.com/@kniga-knig`} target="_blank" style={iconStyle}><YouTubeIcon size={20} color={`rgba(var(--primary-color), 1)`} /></a>
            <a className={`social_icon_link`} href={`https://vk.com/knigaknigcourses`} target="_blank" style={iconStyle}><VKIcon size={20} color={`rgba(var(--primary-color), 1)`} /></a>
            <a className={`social_icon_link`} href={`https://ok.ru/group/70000002139641`} target="_blank" style={iconStyle}><OKIcon size={20} color={`rgba(var(--primary-color), 1)`} /></a>
            <a className={`social_icon_link`} href={`https://dzen.ru/knigaknig`} target="_blank" style={iconStyle}><YandexZenIcon size={20} color={`rgba(var(--primary-color), 1)`} /></a>
        </React.Fragment>
    }
    return (
        <footer id="footer" className={`footer${className ? ` ${className}` : ''}`}>
            <Container>
                <div className={`d-none d-xs-none d-sm-none d-md-block`}>
                    <Row g={3} >
                        <Col xs={12} sm={12} md={3}>
                            <span className={`footer-text-title`}>Горячая линия:</span><br />
                            <a href="tel:88001001844" className={`footer-text-description`}>8 (800) 100 18 44</a>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                            <span className={`footer-text-title`}>E-mail:</span><br />
                            <a href="mailto:contact@kniga-knig.info" className={`footer-text-description`}>contact@kniga-knig.info</a>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <span className={`footer-text-title`}>Адрес:</span><br />
                            <a className={`footer-text-description`}>г. Тула, ул. Станиславского, д. 48</a>
                        </Col>
                        <Col xs={12} sm={12} md={2} className={`footer-icons-container`}>
                            <SocialIcons />
                        </Col>
                    </Row>
                </div>
                <div className={`d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none`}>
                    <Row g={3} >
                        <Col xs={10} sm={10} md={3}>
                            <div className="footer-column-container">
                                <div>
                                    <div className={`footer-text-title`}>Горячая линия:</div>
                                    <a href="tel:88001001844" className={`footer-text-description mb-3`}>8 (800) 100 18 44</a><br /><br />
                                </div>
                                <div>
                                    <div className={`footer-text-title`}>E-mail:</div>
                                    <a href="mailto:contact@kniga-knig.info" className={`footer-text-description`}>contact@kniga-knig.info</a><br /><br />
                                </div>
                                <div>
                                    <span className={`footer-text-title`}>Адрес:</span><br />
                                    <a className={`footer-text-description`}>г. Тула, ул. Станиславского, д. 48</a>
                                </div>
                            </div>
                        </Col>
                        <Col xs={2} sm={2} md={2} className={`footer-icons-container`}>
                            <SocialIcons />
                        </Col>

                    </Row>
                </div>


                {children}
            </Container>
        </footer>
    )
}