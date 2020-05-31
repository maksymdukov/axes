export const normalizeAxe = (axe) => {
  const normalized = {
    ...axe.fields,
    id: axe.sys.id,
    createdAt: axe.sys.createdAt
  };
  if (normalized.images) {
    normalized.images = axe.fields.images.map(
      ({
        fields: {
          title,
          file: {
            url,
            details: {
              image: { width, height }
            }
          }
        }
      }) => {
        return { title, url, width, height };
      }
    );
  }
  return normalized;
};
