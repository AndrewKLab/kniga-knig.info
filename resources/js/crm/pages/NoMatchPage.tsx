import React, { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

export const NoMatchPage: FunctionComponent = (): JSX.Element => {
    let location = useLocation();
    return (
        <div>
            <h3>Нет соответствия для <code>{location.pathname}</code></h3>
        </div>
    )
}
