"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import Swal from "sweetalert2";
import { checkToken } from "../api/login";
import { fetchData } from "../api/fetch";
import Image from "next/image";

interface Property {
  id: number,
  property_name: string,
  property_code: string,
  check_in: string,
  check_out: string,
  bedrooms: number,
  adults: number,
  children: number,
  parking: number,
  pets: number,
  price: number,
  website: string,
  website_image: string
}

const DataPage = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [data, setData] = useState<Property[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkTokenAndFetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await checkToken(token);
          if (response.status) {
            setIsAuthorized(true);
            fetchDataAndSetData(token);
          } else {
            handleUnauthorized();
          }
        } catch (error) {
          handleUnauthorized();
        }
      } else {
        handleUnauthorized();
      }
    };

    const fetchDataAndSetData = async (token: string) => {
      try {
        const result = await fetchData(token);
        if (result.status) {
          setData(result.data);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to fetch data.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while fetching data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const handleUnauthorized = () => {
      setIsAuthorized(false);
      localStorage.removeItem("authToken");
      router.push("/");
    };

    checkTokenAndFetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Swal.fire({
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      router.push("/");
    });
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6 text-center w-full">
          <Image 
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={100}
            priority // Ensures the logo is preloaded
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Service apartments
          </h1>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-40 h-40">
                  <img
                    src={item.website_image}
                    alt={item.property_name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.property_name}</h2>
                  <p className="text-gray-500">Property code: {item.property_code}</p>
                  <p>Check in: {item.check_in} Check out: {item.check_out}</p>
                  <div className="flex flex-wrap items-center space-x-2 mt-2 lg:space-x-4">
                    <div className="flex items-center">
                      <Image src="/bed.png" alt="Bedrooms" width={20} height={20} />
                      <span className="ml-2">{item.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Image src="/adult.png" alt="Adults" width={20} height={20} />
                      <span className="ml-2">{item.adults} Adults</span>
                    </div>
                    <div className="flex items-center">
                      <Image src="/child.png" alt="Children" width={20} height={20} />
                      <span className="ml-2">{item.children} Children</span>
                    </div>
                    <div className="flex items-center">
                      <Image src="/park.png" alt="Parking" width={20} height={20} />
                      <span className="ml-2">{item.parking} Parking</span>
                    </div>
                    <div className="flex items-center">
                      <Image src="/pet.png" alt="Pets" width={20} height={20} />
                      <span className="ml-2">{item.pets} Pets</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mt-4 sm:mt-0">
                <span className="text-xl font-bold text-purple-500">${item.price.toFixed(2)}</span>
                <button className="mt-2 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                  Select
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DataPage;
