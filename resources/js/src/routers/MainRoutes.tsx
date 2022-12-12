import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions, userActions, lessonActions } from '../_actions';
import { PrivateRoute } from '../_components';

import {
  HomePage,
  CoursesPage,
  CoursePage,
  LessonPage,
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
  PrivacyPoliticPage
} from '../pages';

const MainRoutes = ({ }) => {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     const init = async () => {
  //         await getTokenHelper(dispatch);
  //         const deviceInfo = await getDeviceInfo();
  //         const checkAuth = await dispatch(userActions.checkAuth(deviceInfo))
  //         if (checkAuth.isLogined) await dispatch(userActions.validateToken(checkAuth.token))
  //         setLoading(false)
  //     }
  //     init();
  // }, [])


  // if (loading === true || validate_token_loading === true) return <Loading />

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/courses/:kk_course_id/:kk_lesson_id" element={<LessonPage />} />
      <Route path="/courses/:kk_course_id" element={<CoursePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
      <Route path="/password/verify/pin" element={<VerifyPinPasswordPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />

      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />}/>} />
      <Route path="/profile/edit" element={<PrivateRoute element={<ProfileEditPage />}/>} />

      <Route path="/chats" element={<PrivateRoute element={<ChatsPage />}/>} />
      <Route path="/chats/:kk_chat_id" element={<PrivateRoute element={<ChatPage />}/>} />

      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/confidential" element={<PrivacyPoliticPage />} />
      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  );
}

function mapStateToProps(state) {
  const { alert, style } = state;
  return {
    alert,
    style
  };
}
const connectedMainRoutes = connect(mapStateToProps)(MainRoutes);
export { connectedMainRoutes as MainRoutes };