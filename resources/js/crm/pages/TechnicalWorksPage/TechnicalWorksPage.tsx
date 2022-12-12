import React, { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import {Image} from '../../_components/UI';
import './index.css';

export const TechnicalWorksPage: FunctionComponent = (): JSX.Element => {
    let location = useLocation();
    return (
        <div className={`technicals_works_page`}>
            <div className={`technicals_works_page_information`}>
                <Image height={200} src={`site/pngwing.com.png`}/>
                <h1>Режим технического обслуживания</h1>
                <p>В данный момент сайт находится на техническом обслуживании до <b>20.11.2022.</b></p>
                <p>Приносим извинения за временные неудобства.</p>
                <p>Списибо за внимание.</p>
            </div>
        </div>
    )
}
