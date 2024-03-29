import React, { FunctionComponent, useEffect } from "react";

import './index.css';
import { Col, Image, Row } from "../../../public/_components/UI";


type AutorCardProps = {
    className?: string;
    title?: string;
    desctiption?: string;
    img?: string;
}

export const AutorCard: FunctionComponent<AutorCardProps> = ({ className, title, desctiption, img }): JSX.Element => {
    return (
        <div className={`autor_card${className ? ` ${className}` : ''}`}>
            <Row g={3}>
                <Col xs={12} lg={6} >
                    <Image src={img} />
                </Col>
                <Col xs={12} lg={6} >
                    <div className={`autor_card_body`}>
                        <div className={`autor_card_title`}>{title}</div>
                        <div className={`autor_card_text`}>{desctiption}</div>
                    </div>
                </Col>
            </Row>
        </div>

    )
}
