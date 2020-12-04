import { config } from '~/config/config';
import { apiRequest } from '~/utils/api';

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
    comments = await apiRequest({
      url: `/v1/comments/${slug}`,
      params: {
        page,
        size
      }
    });
  } catch (error) {
    console.error(error);
  }
  return comments;
};

export const postComment = async ({ values }) => {
  return apiRequest({
    url: `/comments/v1/comments`,
    method: 'POST',
    data: values
  });
};
