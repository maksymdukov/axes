export const apiRequest = async ({ method, url, data }) => {
  const response = await fetch(`${process.env.PUBLIC_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Not ok");
  }
  return response;
};
