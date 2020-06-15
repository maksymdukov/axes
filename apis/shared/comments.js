import { config } from '~/config/config';
import { serviceApiRequest } from '~/utils/api';

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
    comments = await serviceApiRequest({
      url: `/comments/${slug}?page=${page}&size=${size}`
    });
  } catch (error) {
    console.error(error);
  }
  return comments;
};

export const postComment = async ({ values }) => {
  return serviceApiRequest({
    url: `/comments`,
    method: 'POST',
    data: values
  });
};
