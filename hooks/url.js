import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { parseFullPath } from '~/utils/url';

export const usePurePathname = () => {
  const { asPath, pathname } = useRouter();

  const factoryAsPath = useMemo(() => parseFullPath(asPath), [asPath]);
  const factoryPathname = useMemo(() => parseFullPath(pathname), [pathname]);

  const { lang, path } = useMemo(factoryAsPath, [factoryAsPath]);
  const { path: pagePath } = useMemo(factoryPathname, [factoryPathname]);

  return { lang, path, pagePath };
};
