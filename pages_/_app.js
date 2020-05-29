import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/shared/theme/theme';
import 'swiper/css/swiper.css';
import CartProvider from '../context/cart/cart-provider';
import SnackbarProvider from '../context/snackbar/snackbar-provider';
import {
  getUserLanguageSetting,
  setUserLanguageSetting
} from '~/utils/language';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Save default language
    const savedLang = getUserLanguageSetting();
    if (savedLang) {
      // TODO redirect;
      return;
    }
    setUserLanguageSetting();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <SnackbarProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </CartProvider>
        </ThemeProvider>
        <style jsx global>{`
          :root {
            --swiper-theme-color: ${theme.palette.primary.main};
            --swiper-navigation-color: ${theme.palette.secondary.main};
          }

          a,
          a:hover {
            text-decoration: none;
            color: inherit;
          }
          .blurred {
            filter: blur(2px);
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default MyApp;
