"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { checkToken } from "../api/login";
import { fetchData } from "../api/fetch";
import Image from "next/image";

interface Property {
  id: number;
  property_name: string;
  property_code: string;
  check_in: string;
  check_out: string;
  bedrooms: number;
  adults: number;
  children: number;
  parking: number;
  pets: number;
  price: number;
  website: string;
  website_image: string;
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

  if (!isAuthorized) return null; // Render nothing if not authorized

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Company Logo at the top */}
      

      <div className="w-full max-w-screen-xl p-8 bg-white shadow-lg rounded-lg mb-6">
      <div className="mb-6 text-start w-full">
        <Image 
          src="/logo.png"  // Update this path to the actual logo path
          alt="Company Logo"
          width={200}
          height={100}
        />
      </div>
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Service apartments
          </h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex items-center bg-white shadow-sm relative"
              >
                <div className="relative w-40 h-40 mr-6">
                  <img
                    src={item.website_image}
                    alt={item.property_name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <a
                    href={`https://${item.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-0 bottom-0 bg-white bg-opacity-70 text-blue-500 text-center py-1 rounded-b-lg transition-transform transform hover:scale-105"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item.website}
                  </a>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.property_name}
                  </h2>
                  <p className="text-gray-500">
                    Property code: {item.property_code}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="font-medium text-gray-600">Check in:</span>
                    <span className="text-gray-800">
                      {new Date(item.check_in).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-gray-600">
                      Check out:
                    </span>
                    <span className="text-gray-800">
                      {new Date(item.check_out).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Image
                        src="/bed.png"
                        alt="Bedrooms"
                        width={20}
                        height={20}
                      />
                      <span>{item.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/adult.png"
                        alt="Adults"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">{item.adults} Adults</span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/child.png"
                        alt="Children"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">{item.children} Children</span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/park.png"
                        alt="Parking"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">{item.parking} Parking</span>
                    </div>
                    <div className="flex items-center">
                      <Image 
                        src="/pet.png"
                        alt="Pets"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">{item.pets} Pets</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-500">
                      ${item.price.toFixed(2)}
                    </span>
                    <button className="py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DataPage;
