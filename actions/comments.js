import { commentsApiRequest } from '~/utils/api';
import { config } from '~/config/config';

export const getCommentsBySlug = async ({
  slug,
  page = 1,
  size = config.COMMENTS_SIZE
}) => {
  let comments = {
    items: [],
    size,
    total: 0,
    page
  };
  try {
    comments = await commentsApiRequest({
      url: `/api/comments/${slug}?page=${page}&size=${size}`
    });
  } catch (error) {
    console.error(error);
  }
  return comments;
};

export const postComment = async ({ values }) => {
  return commentsApiRequest({
    url: `/api/comments`,
    method: 'POST',
    data: values
  });
};
