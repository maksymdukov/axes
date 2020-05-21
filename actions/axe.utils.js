export const normalizeAxe = (axe) => {
  const normalized = { ...axe.fields, id: axe.sys.id };
  if (normalized.images) {
    normalized.images = axe.fields.images.map((img) => {
      return { title: img.fields.title, url: img.fields.file.url };
    });
  }
  return normalized;
};
