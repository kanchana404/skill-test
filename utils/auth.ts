// utils/auth.ts
import { parseCookies } from 'nookies';

export async function validateToken(ctx?: any) {
  const cookies = parseCookies(ctx);
  const token = cookies.accessToken;

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://skill-test.similater.website/api/v1/validate', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}
