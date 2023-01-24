import React, { FunctionComponent, useState } from "react";
import './index.css'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    tabs?: Array<any>;
}

export const Tabs: FunctionComponent<TabsProps> = ({ children, className, tabs, ...other }) => {
    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].key : 0)
    return <div className={`tabs${className ? ` ${className}` : ''}`} {...other}>
        <div className={`tabs_menu`}>
            {tabs?.map((item, index) => <div key={item.key} className={`tabs_menu_item${activeTab === item.key ? ` active`:``}`} onClick={()=>setActiveTab(item.key)}>{item.menuTitle}</div>)}
        </div>
        <div className={`tabs_content`}>
            {tabs?.map((item, index) => <div key={item.key} className={`tabs_content_item${activeTab === item.key ? ` active`:``}`} >{item.contentComponent}</div>)}
        </div>
    </div>
} 