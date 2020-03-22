import React from "react";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Link from "../../shared/link/link";
import { Box } from "@material-ui/core";
import { Pagination as MuiPagination } from "@material-ui/lab";

const Pagination = ({ page, pageCount }) => {
  return (
    <Box display="flex" justifyContent="center" my={3}>
      <MuiPagination
        color="primary"
        shape="rounded"
        size="large"
        page={page}
        count={pageCount}
        renderItem={item => (
          <PaginationItem
            component={Link}
            href={`/axes${item.page === 1 ? "" : "/[page]"}`}
            as={`/axes${item.page === 1 ? "" : `/${item.page}`}`}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default Pagination;
