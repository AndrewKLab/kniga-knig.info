import React, { FunctionComponent, useState } from "react";
import './index.css'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement;
    className?: string;
    tabs?: Array<any>;
}

export const Tabs: FunctionComponent<TabsProps> = ({ children, className, tabs, ...other }) => {
    let activeTabVal = tabs && tabs.length > 0 ? tabs[0].key : 0;
    const [activeTab, setActiveTab] = useState(activeTabVal)
    return <div className={`tabs${className ? ` ${className}` : ''}`} {...other}>
        <TabsMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={`tabs_content`}>
            {tabs?.map((item, index) => <div key={item.key} className={`tabs_content_item${activeTab === item.key ? ` active`:``}`} >{item.contentComponent}</div>)}
        </div>
    </div>
} 

export interface TabsMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement;
    className?: string;
    tabs?: Array<any>;
    activeTab: any;
    setActiveTab: any;
}

export const TabsMenu: FunctionComponent<TabsMenuProps> = ({ children, className, tabs, activeTab, setActiveTab, ...other }) => {
    return  <div className={`tabs_menu${className ? ` ${className}` : ''}`} {...other}>
    {tabs?.map((item, index) => <div key={item.key} className={`tabs_menu_item${activeTab === item.key ? ` active`:``}`} onClick={()=>setActiveTab(item.key)}>{item.menuTitle}</div>)}
</div>
} 