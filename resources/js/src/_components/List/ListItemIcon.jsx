import React from 'react'

export const ListItemIcon = (props) => {
    const {className, children} = props;
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <div className={'list-item-icon'+styleClass}>
            {children}
        </div>
    )
}


