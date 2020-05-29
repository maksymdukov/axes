import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const usePurePathname = () => {
  const { asPath } = useRouter();

  return useMemo(() => {
    const slugs = asPath.split('/');
    let startIdx = 1;
    if (slugs[1] === 'ua') {
      startIdx = 2;
    }
    return '/' + slugs.slice(startIdx).join('/');
  }, [asPath]);
};
