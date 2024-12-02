export async function fetchUserFromStrapi(token: string): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:1337/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Strapi validation failed: ${response.statusText}`);
      return false;
    }

    const user = await response.json();
    return user && user.role && user.role.name === 'Authenticated';
  } catch (error) {
    console.error('Error fetching user from Strapi:', error);
    return false;
  }
}
