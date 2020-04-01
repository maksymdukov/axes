export const apiRequest = async ({ method, url, data, options }) => {
  const response = await fetch(
    `${location.origin}${url}`,
    options || {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  if (!response.ok) {
    throw new Error("Not ok");
  }
  return response;
};
