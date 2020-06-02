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
import { parseFullPath } from '~/utils/url';
import Router from 'next-translate/Router';
import Preloader from '@Components/shared/preloader/preloader';

class MyApp extends App {
  state = {
    languageChanged: false,
    sameLanguage: false
  };

  backdropref = React.createRef();

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    this.backdropref.current.addEventListener('transitionend', () => {
      this.backdropref.current.style.display = 'none';
    });

    // Save default language
    const savedLang = getUserLanguageSetting();
    if (savedLang) {
      const { lang, path: asPath } = parseFullPath(this.props.router.asPath)();
      const { path: url } = parseFullPath(this.props.router.pathname)();
      if (lang !== savedLang) {
        // Not the best solution
        // Can be alleviated by showing fullscreen loader
        // Since we use SSG there is no way to save preferred user lang in cookie
        // That's why preloader is necessary
        Router.pushI18n({
          url: url,
          as: asPath,
          options: { lang: savedLang }
        }).then(() => {
          this.setState({ languageChanged: true });
        });
        return;
      }
    }
    this.setState({ languageChanged: true, sameLanguage: true });
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
              <Preloader
                ref={this.backdropref}
                languageChanged={this.state.languageChanged}
                sameLanguage={this.state.sameLanguage}
              />
            </SnackbarProvider>
          </CartProvider>
        </ThemeProvider>
        <style jsx global>{`
          body {
            overflow-x: hidden;
          }
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

          #box {
            position: relative;
            width: 150px;
            height: 150px;
            margin-left: 60px;
          }
          #icon1 {
            fill: rgb(112, 128, 144);
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: center;
            animation: rotate-clockwise 2s linear;
            transform-origin: 30% 60%;
            animation-iteration-count: infinite;
          }
          #icon2 {
            fill: rgb(112, 128, 144);
            position: absolute;
            width: 100%;
            height: 100%;
            left: -60px;
            transform-origin: 65% 62%;
            animation: rotate-anticlockwise 2s linear;
            animation-iteration-count: infinite;
          }
          @keyframes rotate-clockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes rotate-anticlockwise {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default MyApp;
