import { usePurePathname } from './url';
import { useCallback } from 'react';
import { setUserLanguageSetting } from '~/utils/language';
import Router from 'next/router';

export const useLanguageToggler = () => {
  const { path: purePathname, pagePath } = usePurePathname();
  const toggleLanguage = useCallback(
    (lng) => {
      // localstorage
      setUserLanguageSetting(lng);
      Router.push(pagePath, purePathname, { locale: lng });
    },
    [purePathname, pagePath]
  );
  return { toggleLanguage };
};
