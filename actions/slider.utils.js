export const normalizeSlide = slide => {
  return {
    id: slide.sys.id,
    title: slide.fields.title,
    url: slide.fields.image.fields.file.url
  };
};