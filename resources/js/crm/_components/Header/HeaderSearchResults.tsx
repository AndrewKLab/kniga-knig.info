import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, InputGroup, Divider, ListItemProps, List, ListItem } from '../UI';
import { User } from '../../_interfaces';
import { useNavigate } from "react-router-dom";
import { GearOutlineIcon, UserCircleOutlineIcon, XCircleIcon, MagnifyingGlassOutlineIcon } from "../UI/Icons";
import { HeaderSearchResultsItem } from '../../_components';


export interface HeaderSearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    main_site_search_loading: boolean;
    main_site_search_results: any;
    main_site_search_error: string;

    search_request: string;

    user: User;
    setOpenSearchMobileDropdown: any
}

const HeaderSearchResults: FunctionComponent<HeaderSearchResultsProps> = ({ children, main_site_search_loading, main_site_search_results, main_site_search_error, search_request, setOpenSearchMobileDropdown }): JSX.Element => {
    let navigate = useNavigate();
    const openLink = (item) => {
        setOpenSearchMobileDropdown(false);
        navigate(`/courses/${item.category_name}/${item.id}`);
    }

    return (
        <div className={`navbar-search-results`}>
            {main_site_search_loading && <div>{"Поиск..."}</div>}
            {main_site_search_error && <div>{main_site_search_error}</div>}
            {main_site_search_results && (main_site_search_results.courses || main_site_search_results.lessons) && (
                <div>
                    {main_site_search_results.courses && main_site_search_results.courses.length > 0 ? (
                        <div className={`navbar-search-results-items`}>
                            <h2>Курсы:</h2>
                            <Divider />
                            <List
                                dataSource={main_site_search_results.courses}
                                renderItem={(item: ListItemProps, index: number) => <HeaderSearchResultsItem key={item.kk_course_id} item={item} openLink={openLink} />}
                            />
                        </div>
                    ) : null}
                    {main_site_search_results.lessons && main_site_search_results.lessons.length > 0 ? (
                        <div className={`navbar-search-results-items`}>
                            <h2>Уроки:</h2>
                            <Divider />
                            <List
                                dataSource={main_site_search_results.lessons}
                                renderItem={(item: ListItemProps, index: number) => <HeaderSearchResultsItem key={item.kk_course_id} item={item} openLink={openLink} />}
                            />
                        </div>
                    ) : null}
                </div>
            )}
            {children}
        </div>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const { main_site_search_loading, main_site_search_results, main_site_search_error } = state.search;
    return { user, main_site_search_loading, main_site_search_results, main_site_search_error };
}
const connectedHeaderSearchResults = connect(mapStateToProps)(HeaderSearchResults);
export { connectedHeaderSearchResults as HeaderSearchResults };