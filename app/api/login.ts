// /api/login.ts

export const login = async (email: string, password: string) => {
    const response = await fetch('https://skill-test.similater.website/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });
  
    return response.json();
  };
  
  export const checkToken = async (token: string) => {
    const response = await fetch('https://skill-test.similater.website/api/v1/user/check', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    return response.json();
  };
  