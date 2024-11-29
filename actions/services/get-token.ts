

export function getAuthToken() {
  const authToken = process.env.STRAPI_TOKEN
  return authToken;
}