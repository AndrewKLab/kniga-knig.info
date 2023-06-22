import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
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

  MyTrainingPage,

  ProfilePage,
  ProfileEditPage,

  NoMatchPage,
  PrivacyPoliticPage,
  HomePageSecond,
  CoursesPromoPage,
  СourseDiplomFormPage,
  OfertaPage
} from '../pages';

import { ChatsPage, ChatPage } from '../../public/_components';

const MainRoutes = ({ }) => {
  return (
    <Routes>
      {/* <Route index path="/" element={<HomePage />} /> */}
      <Route index path="/" element={<HomePageSecond />} />
      <Route path="/courses/:kk_course_id/:kk_lesson_id" element={<LessonPage />} />
      <Route path="/courses_promo/:kk_cp_id" element={<CoursesPromoPage />} />
      <Route path="/courses_diplom_form" element={<PrivateRoute element={<СourseDiplomFormPage />} />} />
      <Route path="/courses/:kk_course_id" element={<CoursePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login/:type" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
      <Route path="/password/verify/pin" element={<VerifyPinPasswordPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />

      <Route path="/my_training" element={<PrivateRoute element={<MyTrainingPage />} />} />

      <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path="/profile/edit" element={<PrivateRoute element={<ProfileEditPage />} />} />

      <Route path="/chats" element={<PrivateRoute element={<ChatsPage />} />} />
      <Route path="/chats/:kk_chat_id" element={<PrivateRoute element={<ChatPage />} />} />

      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/confidential" element={<PrivacyPoliticPage />} />
      <Route path="/oferta" element={<OfertaPage />} />
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