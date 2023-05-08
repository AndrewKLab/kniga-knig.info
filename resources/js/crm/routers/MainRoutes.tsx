import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation  } from "react-router-dom";
import { connect } from 'react-redux';
import { PrivateRoute, Header, HeaderNavbarDrawerMenu, PageAlert } from '../_components';


import {
  HomePage,
  CoursesPage,
  CoursesConstructorPage,
  UsersPage,
  UsersPageAction,
  UsersPageInfo,
  UsersPageCourseProgress,
  AboutUsPage,
  ContactsPage,

  RegistrationPage,
  LoginPage,
  ForgotPasswordPage,
  VerifyPinPasswordPage,
  ResetPasswordPage,

  ProfilePage,
  ProfileEditPage,

  ChatsPage,
  ChatPage,

  NoMatchPage,
  PrivacyPoliticPage,
  SettingsPage,
  StatisticsPage,
  CourseStatisticPage,
  OrganizationsPage,
  OrganizationsActionPage

} from '../pages';

import { Alert, Col, Drawer, Row } from '../_components/UI';
import { useWindowWidth } from '../_hooks';
import { notificationsActions } from '../../public/_actions';



const MainRoutes = ({dispatch,  user }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const header = document.getElementById('header')
  const width = useWindowWidth();


  useEffect(() => {

    const init = async () => {
      if (!user) navigate(`/login`)
      if (user) dispatch(notificationsActions.createNotificationPusherToChannel({ channel: `App.Models.KK_User.${user.kk_user_id}` }))

      setLoading(false)
    }
    init();
  }, [])

  const CustomAccessRoute = ({ element, rule }) => {
    return rule ? element : <PageAlert type={`danger`} message={`Доступ закрыт!`} />
  }

  if (user?.role?.kk_role_type === 'ROLE_USER') return <PageAlert type={`danger`} message={`Доступ закрыт!`} />

  return (
    <React.Fragment>
      {user && <Header />}
      <div className={`crm_panel_container`}>
        {user && <div>
          <Drawer open={true} overlay={<HeaderNavbarDrawerMenu />} />
        </div>
        }
        <div className={`crm_panel_page_container`} style={{ height: `calc(100vh - ${header?.offsetHeight}px)` }} >
          <Routes>
            <Route index path="/" element={<PrivateRoute element={<HomePage />} />} />

            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/password/forgot" element={<ForgotPasswordPage />} />
            <Route path="/password/verify/pin" element={<VerifyPinPasswordPage />} />
            <Route path="/password/reset" element={<ResetPasswordPage />} />

            <Route index path="/courses" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute element={<CoursesPage />} />} />} />
            <Route path="/courses/constructor/:action" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<CoursesConstructorPage />} />} />} />
            <Route path="/courses/constructor/:action/:kk_course_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<CoursesConstructorPage />} />} />} />
            <Route path="/courses/statistic/:kk_course_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<CourseStatisticPage />} />} />} />

            <Route index path="/users" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute element={<UsersPage />} />} />} />
            <Route path="/users/action/:action" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<UsersPageAction />} />} />} />
            <Route path="/users/action/:action/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<UsersPageAction />} />} />} />
            <Route path="/users/info/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<UsersPageInfo />} />} />} />
            <Route path="/users/info/course_progress/:kk_course_id/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<UsersPageCourseProgress />} />} />} />

            <Route path="/chats" element={<PrivateRoute element={<ChatsPage />} />} />
            <Route path="/chats/:kk_chat_id" element={<PrivateRoute element={<ChatPage />} />} />

            <Route index path="/settings" element={<CustomAccessRoute rule={user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN'} element={<PrivateRoute element={<SettingsPage />} />} />} />
            
            <Route index path="/statistic" element={<CustomAccessRoute rule={user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN'} element={<PrivateRoute element={<StatisticsPage />} />} />} />
            
            <Route index path="/organizations" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute element={<OrganizationsPage />} />} />} />
            <Route path="/organizations/action/:action" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<OrganizationsActionPage />} />} />} />
            <Route path="/organizations/action/:action/:kk_organization_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element={<PrivateRoute backButton element={<OrganizationsActionPage />} />} />} />

            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}
const connectedMainRoutes = connect(mapStateToProps)(MainRoutes);
export { connectedMainRoutes as MainRoutes };