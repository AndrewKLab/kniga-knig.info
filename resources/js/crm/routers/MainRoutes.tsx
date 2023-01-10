import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
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

} from '../pages';

import { Alert, Col, Drawer, Row } from '../_components/UI';



const MainRoutes = ({ user }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!user) navigate(`/login`)
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
        <div className={`crm_panel_page_container`}>
          <Routes>
            <Route index path="/" element={<PrivateRoute element={<HomePage />} />} />

            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/password/forgot" element={<ForgotPasswordPage />} />
            <Route path="/password/verify/pin" element={<VerifyPinPasswordPage />} />
            <Route path="/password/reset" element={<ResetPasswordPage />} />

            <Route index path="/courses" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute element={<CoursesPage />} />} />} />
            <Route path="/courses/constructor/:action" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<CoursesConstructorPage />} />} />} />
            <Route path="/courses/constructor/:action/:kk_course_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_USER' && user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<CoursesConstructorPage />} />} />} />

            <Route index path="/users" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute element={<UsersPage />} />} />} />
            <Route path="/users/action/:action" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<UsersPageAction />} />} />} />
            <Route path="/users/action/:action/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<UsersPageAction />} />} />} />
            <Route path="/users/info/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<UsersPageInfo />} />} />} />
            <Route path="/users/info/course_progress/:kk_course_id/:kk_user_id" element={<CustomAccessRoute rule={user?.role?.kk_role_type !== 'ROLE_PROMOUTER'} element= {<PrivateRoute backButton element={<UsersPageCourseProgress />} />} />} />
            

            <Route index path="/settings" element={<CustomAccessRoute rule={user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN'} element= {<PrivateRoute element={<SettingsPage />} />} />} />

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