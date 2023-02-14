import React, { FunctionComponent, useState } from "react";
import { connect } from 'react-redux';
import { IconButton, InputGroup, InputGroupText, TextInput } from '../../../public/_components/UI';
import { HeaderSearchResults } from '../';
import { searchActions } from "../../_actions";
import { User, Themes } from '../../_interfaces';

import { XCircleIcon, MagnifyingGlassOutlineIcon } from "../../../public/_components/UI/Icons";


export interface HeaderSearchDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    user: User;

    setOpenSearchMobileDropdown: any;
}

const HeaderSearchDropdownMenu: FunctionComponent<HeaderSearchDropdownMenuProps> = ({ dispatch, children, className, user, setOpenSearchMobileDropdown }): JSX.Element => {
    const [search_request, setSearchRequest] = useState('');

    const handleChange = (value: string) => {
        setSearchRequest(value);
        if(value.length > 0) dispatch(searchActions.search({search: value}));
    }

    const clearSearchInput = () => {
        setSearchRequest('')
    }

    return (
        <React.Fragment>
            <div className={`navbar-search`}>
                <InputGroup className="w-100">
                    <TextInput
                        type="search"
                        id="main-site-search-mobile"
                        name="main-site-search-mobile"
                        placeholder="Поиск..."
                        className="navbar-search-input navbar-search-input-mobile"
                        style={{ display: 'inline-block', flex: '1 1 auto', height: '40px' }}
                        value={search_request}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <InputGroupText className="navbar-search-input-icon">
                        <MagnifyingGlassOutlineIcon size={26} color={'#E5F8E2'} />
                    </InputGroupText>

                </InputGroup>
                <IconButton icon={<XCircleIcon size={26} />} onClick={clearSearchInput} />
            </div>
            {search_request && <HeaderSearchResults search_request={search_request} setOpenSearchMobileDropdown={setOpenSearchMobileDropdown} />}
        </React.Fragment>
    )
}


function mapStateToProps(state) {
    const { user } = state.auth;
    const { currentTheme, themes } = state.style;
    return { user, currentTheme, themes };
}
const connectedHeaderSearchDropdownMenu = connect(mapStateToProps)(HeaderSearchDropdownMenu);
export { connectedHeaderSearchDropdownMenu as HeaderSearchDropdownMenu };