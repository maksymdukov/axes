import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import SortFilter from '@Components/shared/filters/sort-filter';
// import { useRouter } from 'next/router';

const Sort = ({ doRequest }) => {
  // const { asPath, push, pathname, query, beforePopState } = useRouter();
  // console.log('query', query);
  // console.log('pathname', pathname);
  // console.log('asPath', asPath);

  // useEffect(() => {
  //   // investigate
  //   beforePopState((st) => console.log('st', st));
  // }, []);

  const handleSortChange = useCallback(
    async ([sort, order]) => {
      try {
        await doRequest({ sort, sortOrder: order });
        // TODO trim asPath from any queries before passing to push
        // router.query seems to be wrong choice to look for.
        // Dont pass any queeies when filter is 'Новинки'
        // push(pathname, `${asPath}?test=12`, { shallow: true });
      } catch (error) {
        console.error(error);
      }
    },
    [doRequest]
  );

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <SortFilter onChange={handleSortChange} />
    </Box>
  );
};

export default Sort;
