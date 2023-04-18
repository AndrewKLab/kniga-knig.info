import React, { FunctionComponent, useEffect } from "react";
import "./index.css";

import Carousel from "nuka-carousel";
import { ArrowSquareRightIcon, ChevronRightIcon } from '../Icons';
import { IconButton } from '../';
import { useWindowWidth } from '../../../_hooks';

const isClient = typeof window !== 'undefined';

export interface CaruselProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    caruselTitle?:
    | React.ReactChild
    | React.ReactChild[];
    caruselViewMore?:
    | React.ReactChild
    | React.ReactChild[];
    caruselViewMoreAction: React.MouseEventHandler<HTMLAnchorElement>;
    caruselCols: number;
    caruselItems: any;
    caruselRenderItem: (item: object, index: number) => React.ReactNode;
    caruselSettings: any;
}

export const Carusel: FunctionComponent<CaruselProps> = ({ children, className, caruselTitle, caruselViewMore, caruselViewMoreAction, caruselCols, caruselItems, caruselRenderItem, caruselSettings, ...other }) => {
    const width = useWindowWidth();

    return (
        <div className={`carusel${className ? ` ${className}` : ''}`} {...other}>
            <div className={`carusel_header`}>
                <div className={`carusel_title`}>{caruselTitle}</div>
                <a className={`carusel_view_more`} onClick={caruselViewMoreAction}>{caruselViewMore}</a>
            </div>

            {caruselItems && caruselItems.length > 0 && <Carousel
                className={`carusel-items`}
                {...caruselSettings}
                slidesToShow={width <= 1200 ? 1.25 : (caruselSettings && caruselSettings.slidesToShow ? caruselSettings.slidesToShow : 2)}
                cellSpacing={width <= 1200 ? 20 : (caruselSettings && caruselSettings.cellSpacing ? caruselSettings.cellSpacing : 15)}
                wrapAround
                renderCenterLeftControls={({ previousDisabled, previousSlide }) => null}
                renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                    width <= 1200 ? null : <IconButton className={`carusel-next-button`} icon={<ChevronRightIcon size={32} />} onClick={nextSlide} disabled={nextDisabled}></IconButton>
                )}
            >{caruselItems.map(caruselRenderItem)}</Carousel >}
            {children}
        </div>
    )
} 