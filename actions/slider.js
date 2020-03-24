import { client, locales } from "../config/contentful";
import { normalizeSlide } from "./slider.utils";

export const getSliderEntries = options =>
  client.getEntries({
    content_type: "slider",
    locale: locales.ua,
    ...options
  });

export const getSlides = async () => {
  const slides = await getSliderEntries();
  return slides.items.map(normalizeSlide);
};
