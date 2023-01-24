import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

import { Header, Footer, MainSiteLoader, Notifications } from './_components';
import { Container } from './_components/UI';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// import { getDeviceInfo, 
//     // getTokenHelper, 
//     // history 
// } from './_helpers';
import { authActions } from './_actions'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'



import { MainRoutes } from './routers';
import { TechnicalWorksPage } from './pages';
import { initLaravelEcho } from '../public/_helpers';

// import { getTokenHelper } from './_helpers/firebase';


// if (library.add) library.add(fab, fas)


const App = ({
  dispatch,
  token,
  user,
  get_auth_user_loading,
  get_auth_user_message,
  get_auth_user_error,
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
  return {
    token,
    user,
    get_auth_user_loading,
    get_auth_user_message,
    get_auth_user_error,
  };
}

export default connect(mapStateToProps)(App);