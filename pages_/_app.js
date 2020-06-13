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
import { pageview } from '~/libs/gtag';
import { isProd } from '~/utils/env';

class MyApp extends App {
  state = {
    languageChanged: false,
    sameLanguage: false
  };

  backdropref = React.createRef();

  async componentDidMount() {
    // Hide preloader on transitionend
    this.backdropref.current.addEventListener(
      'transitionend',
      this.handlePreloaderTransitionEnd
    );

    this.removeServerSideCss();

    // Wait till possible lanugage changed
    await this.saveOrNavigateToLang();

    // Only then add GA handler to prevent counting falsy pageview
    // Google analiytics stuff
    if (isProd) {
      Router.events.on('routeChangeComplete', this.handleRouteChange);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeServerSideCss() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  removeListeners() {
    this.backdropref.current.removeListeners(
      'transitionend',
      this.handlePreloaderTransitionEnd
    );
    if (isProd) {
      Router.events.off('routeChangeComplete', this.handleRouteChange);
    }
  }

  handlePreloaderTransitionEnd = () => {
    this.backdropref.current.style.display = 'none';
  };

  handleRouteChange = (url) => {
    console.log(url);

    pageview(url);
  };

  async saveOrNavigateToLang() {
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
        await Router.replaceI18n({
          url: url,
          as: asPath,
          options: { lang: savedLang }
        });
        this.setState({ languageChanged: true });
        return;
      }
    }
    this.setState({ languageChanged: true, sameLanguage: true });
    setUserLanguageSetting();
  }

  getMetaTags = () => (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      {/* PWA primary color */}
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </>
  );

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Sokyra.net.ua</title>
          {this.getMetaTags()}
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
