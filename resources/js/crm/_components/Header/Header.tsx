import React, { FunctionComponent, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarDesktopMenu, NavbarMenu, NavbarActionsMenu, NavbarMenuItem, Container, InputGroup, InputGroupText, TextInput, IconButton, Dropdown, Drawer, NavbarMobileMenu } from '../UI';
import { User, Themes } from '../../_interfaces';
import { HeaderNavbarDropdownMenu, HeaderSearchDropdownMenu, HeaderNavbarMainDropdownMenu, HeaderNavbarDrawerMenu } from "../";
import { UserCircleOutlineIcon, MagnifyingGlassOutlineIcon, BurgerIcon } from "../UI/Icons";
import { useDetectOutsideClick } from '../../_hooks';
import { searchActions } from "../../_actions";
import { HeaderSearchResults } from "../";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    user: User;
    currentTheme: string;
    themes: Themes;
}

const Header: FunctionComponent<HeaderProps> = ({ dispatch, children, className, user, currentTheme, themes }): JSX.Element => {
    const searchDropdownRef = useRef(null);
    const [openSearchDropdown, setOpenSearchDropdown] = useDetectOutsideClick(searchDropdownRef, false);

    const searchMobileDropdownRef = useRef(null);
    const [openSearchMobileDropdown, setOpenSearchMobileDropdown] = useDetectOutsideClick(searchMobileDropdownRef, false);

    const drawerRef = useRef(null);
    const [openMobileDrawer, setOpenMobileDrawer] = useDetectOutsideClick(drawerRef, false);

    const dropdownRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useDetectOutsideClick(dropdownRef, false);

    const mobileDropdownRef = useRef(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useDetectOutsideClick(mobileDropdownRef, false);

    const [search_request, setSearchRequest] = useState('');

    const handleChange = (value: string) => {
        setOpenSearchDropdown(value.length > 0);
        setSearchRequest(value);
        if (value.length > 0) dispatch(searchActions.search({ search: value }));

    }

    return (
        <header id="header" className={className}>
            <Navbar>
                <Container className="h-100">
                    <NavbarCollapse>
                        <NavbarDesktopMenu>
                            <NavbarBrand href="/">КНИГА<br />КНИГ</NavbarBrand>
                            <NavbarMenu>
                                {user?.role && <NavbarMenuItem href={`/`}>{user?.role.kk_role_name}</NavbarMenuItem>}
                            </NavbarMenu>
                            <NavbarMenu>
                                <li className={`navbar-menu-item`} >
                                    <a className={'navbar-menu-item-inactive'} href={`https://kniga-knig.info`} target="_blank">Посмотреть сайт</a>
                                </li>
                            </NavbarMenu>
                            <NavbarActionsMenu>
                                <Dropdown open={openDropdown} setOpen={setOpenDropdown} dropdown={dropdownRef} overlay={<HeaderNavbarDropdownMenu setOpenDropdown={setOpenDropdown} />} overlayClassName={`navbar-dropdown-actions`}>
                                    <IconButton icon={<UserCircleOutlineIcon size={38} />} />
                                </Dropdown>
                            </NavbarActionsMenu>
                        </NavbarDesktopMenu>
                        <NavbarMobileMenu>
                            <NavbarMenu>
                                <Dropdown open={openMobileDrawer} setOpen={setOpenMobileDrawer} dropdown={drawerRef} overlay={<HeaderNavbarMainDropdownMenu setOpenMainMenuMobileDropdown={setOpenMobileDrawer} />} overlayClassName={`navbar-main-menu-dropdown`}>
                                    <IconButton icon={<BurgerIcon size={30} />} />
                                </Dropdown>
                                <NavbarBrand className={'navbar-brand-mobile'} href="/">КНИГА<br />КНИГ</NavbarBrand>
                            </NavbarMenu>

                            <NavbarMenu>
                                <Dropdown open={openSearchMobileDropdown} setOpen={setOpenSearchMobileDropdown} dropdown={searchMobileDropdownRef} overlay={<HeaderSearchDropdownMenu setOpenSearchMobileDropdown={setOpenSearchMobileDropdown} />} overlayClassName={`navbar-search-actions`}>
                                    <IconButton icon={<MagnifyingGlassOutlineIcon size={26} color={'#E5F8E2'} />} />
                                </Dropdown>

                                <Dropdown open={openMobileDropdown} setOpen={setOpenMobileDropdown} dropdown={mobileDropdownRef} overlay={<HeaderNavbarDropdownMenu setOpenDropdown={setOpenMobileDropdown} />} overlayClassName={`navbar-dropdown-actions`}>
                                    <IconButton icon={<UserCircleOutlineIcon size={26} />} />
                                </Dropdown>
                            </NavbarMenu>
                        </NavbarMobileMenu>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            {children}
        </header>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { currentTheme, themes } = state.style;
    return { user, currentTheme, themes };
}
const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };