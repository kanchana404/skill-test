"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const DataPage = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://skill-test.similater.website/api/v1/user/check', {
            method: 'GET',
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data.status) {
            setIsAuthorized(true);
            setTokenValid(true);
          } else {
            setTokenValid(false);
            setIsAuthorized(false);
            router.push('/');
          }
        } catch (error) {
          console.error('Error checking token validity:', error);
          setTokenValid(false);
          setIsAuthorized(false);
          router.push('/');
        }
      } else {
        setIsAuthorized(false);
        router.push('/');
      }
    };

    checkToken();
  }, [router]);

  const handleLogout = () => {
    // Clear local storage and redirect to the login page
    localStorage.removeItem('authToken');
    Swal.fire({
      title: 'Logged Out!',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      router.push('/');
    });
  };

  if (!isAuthorized) return null; // Render nothing if not authorized

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Data Page</h1>
        <p className="mb-4 text-center text-gray-600">Welcome to the protected data page!</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DataPage;
