import { usePurePathname } from './url';
import { useCallback } from 'react';
import { setUserLanguageSetting } from '~/utils/language';
import Router from 'next-translate/Router';

export const useLanguageToggler = () => {
  const { path: purePathname, pagePath } = usePurePathname();
  const toggleLanguage = useCallback(
    (lng) => {
      // localstorage
      setUserLanguageSetting(lng);

      Router.pushI18n({
        url: pagePath,
        as: purePathname,
        options: { lang: lng }
      });
    },
    [purePathname]
  );
  return { toggleLanguage };
};
