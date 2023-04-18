import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarDesktopMenu, NavbarMenu, NavbarMenuItem, Container, IconButton, Dropdown, NavbarMobileMenu } from '../../../public/_components/UI';
import { User, Themes } from '../../_interfaces';
import { HeaderNavbarDropdownMenu, HeaderSearchDropdownMenu, HeaderNavbarMainDropdownMenu, HeaderNavbarDrawerMenu } from "../";
import { UserCircleOutlineIcon, MagnifyingGlassOutlineIcon, BurgerIcon } from "../../../public/_components/UI/Icons";
import { useDetectOutsideClick } from '../../_hooks';
import { searchActions } from "../../_actions";

import { HeaderNavbarNotificationDropdown } from "../../../public/_components";
import { notificationsActions } from "../../../public/_actions";
import { PromptLessonSaveModal } from "../Modals/PromptLessonSaveModal";
import { useLocation, useNavigate  } from "react-router-dom";
import { Lesson } from "../../../public/_interfaces";

type HeaderProps = {
    dispatch: any;
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    lesson_editor_is_lesson_edit: boolean;
    lesson_editor_is_lesson_edit_open_modal: boolean;
    get_one_by_lesson_id_lessons: Lesson;
    user: User;
    currentTheme: string;
    themes: Themes;
}

const Header: FunctionComponent<HeaderProps> = ({ dispatch, children, className, user, currentTheme, themes, lesson_editor_is_lesson_edit, get_one_by_lesson_id_lessons, lesson_editor_is_lesson_edit_open_modal }): JSX.Element => {
    let location = useLocation();
    let navigate = useNavigate();
    // const { showPrompt, navigation } = useNavBlocker(lesson_editor_is_lesson_edit);

    const searchMobileDropdownRef = useRef(null);
    const [openSearchMobileDropdown, setOpenSearchMobileDropdown] = useDetectOutsideClick(searchMobileDropdownRef, false);

    const drawerRef = useRef(null);
    const [openMobileDrawer, setOpenMobileDrawer] = useDetectOutsideClick(drawerRef, false);

    const dropdownRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useDetectOutsideClick(dropdownRef, false);

    const mobileDropdownRef = useRef(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useDetectOutsideClick(mobileDropdownRef, false);

    // useEffect(() => {
    //     // if (lesson_editor_is_lesson_edit && !lesson_editor_is_lesson_edit_open_modal) {
            
    //     //     navigate(-1)
    //     // }
    //     if (showPrompt) {
    //         dispatch({ type: "OPEN_IS_LESSON_EDIT_MODAL", open: true })
    //       }
    // }, [lesson_editor_is_lesson_edit_open_modal, navigation, showPrompt])

    return (
        <header id="header" className={className}>
            <PromptLessonSaveModal lesson={get_one_by_lesson_id_lessons} />
            <Navbar>
                <Container className="h-100">
                    <NavbarCollapse>
                        <NavbarDesktopMenu>
                            <NavbarBrand href="/">КНИГА<br />КНИГ</NavbarBrand>
                            <NavbarMenu>
                                {user?.role && <NavbarMenuItem href={`/`}>{user?.role.kk_role_name}</NavbarMenuItem>}

                                <li className={`navbar-menu-item`} >
                                    <a className={'navbar-menu-item-inactive'} href={`https://kniga-knig.info`} target="_blank"><h2>Посмотреть сайт</h2></a>
                                </li>
                            </NavbarMenu>
                            <div className={`header_actions`}>
                                {user && <HeaderNavbarNotificationDropdown />}
                                <Dropdown open={openDropdown} setOpen={setOpenDropdown} dropdown={dropdownRef} overlay={<HeaderNavbarDropdownMenu setOpenDropdown={setOpenDropdown} />} overlayClassName={`navbar-dropdown-actions`}>
                                    <IconButton icon={<UserCircleOutlineIcon size={38} />} />
                                </Dropdown>
                            </div>
                        </NavbarDesktopMenu>
                        <NavbarMobileMenu>
                            <NavbarMenu>
                                <Dropdown open={openMobileDrawer} setOpen={setOpenMobileDrawer} dropdown={drawerRef} overlay={<HeaderNavbarMainDropdownMenu setOpenMainMenuMobileDropdown={setOpenMobileDrawer} />} overlayClassName={`navbar-main-menu-dropdown`}>
                                    <IconButton icon={<BurgerIcon size={30} />} />
                                </Dropdown>
                                <NavbarBrand className={'navbar-brand-mobile'} href="/">КНИГА<br />КНИГ</NavbarBrand>
                            </NavbarMenu>

                            <NavbarMenu>
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
    const { get_one_by_lesson_id_lessons, lesson_editor_is_lesson_edit, lesson_editor_is_lesson_edit_open_modal } = state.lessons;
    return { user, currentTheme, themes, get_one_by_lesson_id_lessons, lesson_editor_is_lesson_edit, lesson_editor_is_lesson_edit_open_modal };
}
const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };