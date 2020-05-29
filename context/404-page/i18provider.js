import React, { useEffect, useState } from 'react';
import I18nProvider from 'next-translate/I18nProvider';

import i18nConfig from '~/i18n.json';
import { getUserLanguageSetting } from '~/utils/language';

import commonRU from '~/locales/ru/common.json';
import commonUA from '~/locales/ua/common.json';
import notFoundUA from '~/locales/ua/404.json';
import notFoundRU from '~/locales/ru/404.json';

const { defaultLanguage } = i18nConfig;

const I18CustomProvider = ({ children }) => {
  const [lng, setLng] = useState(defaultLanguage);
  // Language fix
  // Take it from localstorage and change
  // Google will always see russian
  useEffect(() => {
    const userLang = getUserLanguageSetting();
    if (lng !== userLang) {
      setLng(userLang);
    }
  }, []);

  const namespaces =
    lng === 'ru'
      ? {
          common: commonRU,
          404: notFoundRU
        }
      : { common: commonUA, 404: notFoundUA };
  return (
    <I18nProvider
      lang={lng}
      namespaces={namespaces}
      internals={{ defaultLanguage: defaultLanguage, isStaticMode: true }}
    >
      {children}
    </I18nProvider>
  );
};

export default I18CustomProvider;
