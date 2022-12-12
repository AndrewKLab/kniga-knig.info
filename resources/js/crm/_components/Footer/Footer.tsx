import React, { FunctionComponent } from "react";
import { Container, Row, Col, IconButton } from '../UI';
import { YouTubeIcon, VKIcon } from "../UI/Icons";
import { useNavigate } from "react-router-dom";

type FooterProps = {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({ children, className }): JSX.Element => {
    let navigate = useNavigate();
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
                            <a href="mailto:88001001844" className={`footer-text-description`}>contact@kniga-knig.info</a>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <span className={`footer-text-title`}>Адрес:</span><br />
                            <a className={`footer-text-description`}>г. Тула, ул. Станиславского, д. 48</a>
                        </Col>
                        <Col xs={12} sm={12} md={2} className={`footer-icons-container`}>
                            <IconButton icon={<VKIcon />} onClick={() => navigate(`/`)} />
                            <IconButton icon={<YouTubeIcon />} onClick={() => console.log(`/`)} />
                        </Col>
                    </Row>
                </div>
                <div className={`d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none`}>
                    <Row g={3} >
                        <Col xs={10} sm={10} md={3}>
                            <div className={`footer-text-title`}>Горячая линия:</div>
                            <a href="tel:88001001844" className={`footer-text-description mb-3`}>8 (800) 100 18 44</a><br /><br />
                            <div className={`footer-text-title`}>E-mail:</div>
                            <a href="mailto:88001001844" className={`footer-text-description`}>contact@kniga-knig.info</a>
                        </Col>
                        <Col xs={2} sm={2} md={2} className={`footer-icons-container`}>
                            <IconButton icon={<VKIcon />} onClick={() => navigate(`/`)} />
                            <IconButton icon={<YouTubeIcon />} onClick={() => console.log(`/`)} />
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <span className={`footer-text-title`}>Адрес:</span><br />
                            <a className={`footer-text-description`}>г. Тула, ул. Станиславского, д. 48</a>
                        </Col>

                    </Row>
                </div>


                {children}
            </Container>
        </footer>
    )
}