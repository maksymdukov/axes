import { apiRequest } from "../utils/api";

export const sendCustomOrder = async formData => {
  return apiRequest({
    url: "/api/send-custom-order",
    options: {
      method: "POST",
      body: formData
    }
  });
};
