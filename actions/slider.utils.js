export const normalizeSlide = ({
  sys: { id },
  fields: {
    title,
    image: {
      fields: {
        file: {
          url,
          details: {
            image: { width, height }
          }
        }
      }
    },
    imageSmall: {
      fields: {
        file: {
          url: urlSmall,
          details: {
            image: { width: widthSmall, height: heightSmall }
          }
        }
      }
    }
  }
}) => {
  const slide = {
    id: id,
    title: title,
    url,
    width,
    height,
    smallImage: {
      url: urlSmall,
      width: widthSmall,
      height: heightSmall
    }
  };
  return slide;
};
