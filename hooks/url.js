import { useRouter } from 'next/router';
import { useMemo } from 'react';
import i18Config from '~/i18n.json';

export const parseUrl = (url) => () => {
  const slugs = url.split('/');
  let startIdx = 1;
  let language = i18Config.defaultLanguage;
  const notDefaultLanguage = i18Config.allLanguages.find(
    (lng) => lng === slugs[1] && lng !== i18Config.defaultLanguage
  );
  if (notDefaultLanguage) {
    startIdx = 2;
    language = notDefaultLanguage;
  }
  return {
    lang: language,
    path: '/' + slugs.slice(startIdx).join('/')
  };
};

export const usePurePathname = () => {
  const { asPath } = useRouter();

  const factory = useMemo(() => parseUrl(asPath), [asPath]);

  return useMemo(factory, [factory]);
};