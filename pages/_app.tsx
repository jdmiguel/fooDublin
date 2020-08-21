import App from 'next/app';
import Router from 'next/router';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import reducer from '../store/reducer';

import '../helpers/Grid/Grid.scss';
import { GlobalStyles } from '../helpers/GlobalStylesHelper';
import { theme } from '../helpers/Theme';

Router.events.on('routeChangeComplete', (url: string) => {
  (window as any).dataLayer.push({
    url,
    event: 'Pageview',
  });
});

const store = configureStore({
  reducer,
});

export default class MyApp extends App {
  async componentDidMount() {
    // @ts-ignore
    await import('picturefill');
  }

  render() {
    const {
      Component,
      pageProps,
      router: { asPath },
    } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} path={asPath} />
        </ThemeProvider>
      </Provider>
    );
  }
}
