import React, { FunctionComponent, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarDesktopMenu, NavbarMenu, NavbarActionsMenu, NavbarMenuItem, Container, InputGroup, InputGroupText, TextInput, IconButton, Dropdown, Drawer, NavbarMobileMenu } from '../UI';
import { User, Themes } from '../../_interfaces';
import { HeaderNavbarDropdownMenu, HeaderSearchDropdownMenu, HeaderNavbarMainDropdownMenu } from "../";
import { UserCircleOutlineIcon, MagnifyingGlassOutlineIcon, BurgerIcon, YouTubeIcon, VKIcon, OKIcon } from "../UI/Icons";
import { useDetectOutsideClick } from '../../_hooks';
import { searchActions } from "../../_actions";
import { HeaderSearchResults } from "../";
import { config } from "../../_helpers";

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

    const SocialIcons = () => {
        return <div className={`navbar-social-icons`}>
            <a href={`https://www.youtube.com/@golosnadezhdi`} target="_blank"><IconButton icon={<YouTubeIcon size={25} />} /></a>
            <a href={`https://vk.com/golosnadezhdi`} target="_blank"><IconButton icon={<VKIcon size={25} />} /></a>
            <a href={`https://ok.ru/golosnadezhdi`} target="_blank"><IconButton icon={<OKIcon size={25} />} /></a>
        </div>
    }

    return (
        <header id="header" className={className}>
            <Navbar>
                <Container className="h-100">
                    <NavbarCollapse>
                        <NavbarDesktopMenu>
                            <NavbarBrand href="/">КНИГА<br />КНИГ</NavbarBrand>
                            <NavbarMenu>
                                {/* <NavbarMenuItem href={`/`}>Главная</NavbarMenuItem> */}
                                {user?.role?.kk_role_level < 7 && <NavbarMenuItem href={`${config.crmUrl}`} toOtherSite>CRM панель</NavbarMenuItem>}
                                <NavbarMenuItem href={`/courses`}>Курсы</NavbarMenuItem>
                                {/* {user && (
                                    (user.role_type === 'ROLE_SUPER_ADMIN') && <NavbarMenuItem href={`/admin-panel`}>Cуперадмин</NavbarMenuItem>,
                                    (user.role_type === 'ROLE_ADMIN') && <NavbarMenuItem href={`/admin-panel`}>Администратор</NavbarMenuItem>,
                                    (user.role_type === 'ROLE_COORDINATOR') && <NavbarMenuItem href={`/coordinator-panel`}>Панель координатора</NavbarMenuItem>,
                                    (user.role_type === 'ROLE_TEATHER') && <NavbarMenuItem href={`/teather-panel`}>Панель учителя</NavbarMenuItem>,
                                    (user.role_type === 'ROLE_USER' && user.role_name === 'Промоутер') && <NavbarMenuItem href={`/promouter-panel`}>Панель промоутера</NavbarMenuItem>
                                )} */}

                            </NavbarMenu>
                            <NavbarMenu>
                                <NavbarMenuItem href={`/about-us`}>О нас</NavbarMenuItem>
                                <NavbarMenuItem href={`/contacts`}>Контакты</NavbarMenuItem>
                            </NavbarMenu>
                            <NavbarActionsMenu>
                                <SocialIcons/>
                                <InputGroup className="navbar-search-input-group">
                                    <TextInput
                                        type="search"
                                        id="main-site-search"
                                        name="main-site-search"
                                        placeholder="Поиск..."
                                        className="navbar-search-input"
                                        value={search_request}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    <Dropdown open={openSearchDropdown} setOpen={setOpenSearchDropdown} dropdown={searchDropdownRef} overlay={<HeaderSearchResults />} overlayClassName={`navbar-search-desktop`}></Dropdown>

                                    <InputGroupText className="navbar-search-input-icon">
                                        <MagnifyingGlassOutlineIcon size={16} color={'#E5F8E2'} />
                                    </InputGroupText>
                                </InputGroup>
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