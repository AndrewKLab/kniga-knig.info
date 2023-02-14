import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import { Header, Footer, MainSiteLoader } from './_components';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { authActions } from './_actions'
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import { MainRoutes } from './routers';
import { TechnicalWorksPage } from './pages';
import { initLaravelEcho } from '../public/_helpers';
import { Container } from '../public/_components/UI';
import { DonateModal } from '../public/_components';
import { modalsActions } from '../public/_actions';


const App = ({
  dispatch,

  get_auth_user_loading,
  get_auth_user_message,
  get_auth_user_error,

  open_donate_modal,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      const storage_token = localStorage.getItem('token');
      if (storage_token) {
        await dispatch(authActions.getAuthUser());
        await initLaravelEcho(storage_token)
      }
      setLoading(false);
    }
    init();
  }, [])


  if (loading === true || get_auth_user_loading === true) return <MainSiteLoader />

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Ld4gLMiAAAAAF2XtOnW1-V70xM3ZknD_nisaLFB" language="ru">
      <Router>
        {/* <TechnicalWorksPage/> */}
        <Header />
        {/* <Notifications/> */}
        <Container>
          <MainRoutes />
        </Container>
        <Footer />
      </Router>
    </GoogleReCaptchaProvider>
  );
}

function mapStateToProps(state) {
  const {
    token,
    user,
    get_auth_user_loading,
    get_auth_user_message,
    get_auth_user_error,
  } = state.auth
  const {
    open_donate_modal,
  } = state.modals
  return {
    token,
    user,
    get_auth_user_loading,
    get_auth_user_message,
    get_auth_user_error,
    open_donate_modal
  };
}

export default connect(mapStateToProps)(App);