import { setCookie } from 'nookies';

export function saveAuthToken(token: string): void {
  setCookie(null, 'authToken', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
