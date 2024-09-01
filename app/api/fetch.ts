// /api/fetch.ts

export const fetchData = async (token: string) => {
    const response = await fetch('https://skill-test.similater.website/api/v1/property/list', {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    return response.json();
  };
  