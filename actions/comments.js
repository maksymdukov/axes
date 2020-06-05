import { commentsApiRequest } from '~/utils/api';
import { config } from '~/config/config';

export const getCommentsBySlug = async ({
  slug,
  page = 1,
  size = config.COMMENTS_SIZE
}) => {
  return commentsApiRequest({
    url: `/api/comments/${slug}?page=${page}&size=${size}`
  });
};

export const postComment = async ({ values }) => {
  return commentsApiRequest({
    url: `/api/comments`,
    method: 'POST',
    data: values
  });
};
