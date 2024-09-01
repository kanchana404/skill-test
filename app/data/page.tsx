"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { checkToken } from "../api/login";
import { fetchData } from "../api/fetch";
import HotelCard from "@/components/HotelCard";
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
            priority
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
          data.map((item) => <HotelCard key={item.id} property={item} />)
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DataPage;
