import React, { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { Image } from "../../../public/_components/UI";
import './index.css';

export const TechnicalWorksPage: FunctionComponent = (): JSX.Element => {
    let location = useLocation();
    return (
        <div className={`technicals_works_page`}>
            <div className={`technicals_works_page_information`}>
                <Image height={200} src={`site/pngwing.com.png`}/>
                <h1>Режим технического обслуживания</h1>
                <p>Проводятся технические работы в связи с обновлением сайта. Ориентировочное время подключения - <b>18-00 МСК.</b></p>
                <p>Приносим извинения за временные неудобства.</p>
                <p>Списибо за внимание.</p>
            </div>
        </div>
    )
}
