import React, { FunctionComponent } from "react";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    dataSource: Array<object>;
    renderItem: (item: object, index: number) => React.ReactNode;
}

export const List: FunctionComponent<ListProps> = ({ className, dataSource, renderItem, ...other }): JSX.Element => {
    return <div className={`list${className ? ` ${className}` : ''}`} {...other}>{dataSource && dataSource.length > 0 && dataSource.map(renderItem)}</div>
}



