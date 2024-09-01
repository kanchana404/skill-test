// components/HotelCard.tsx

import Image from "next/image";
import Link from "next/link";

interface HotelCardProps {
  property: {
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
  };
}

const HotelCard: React.FC<HotelCardProps> = ({ property }) => {
  return (
    <div
      key={property.id}
      className="flex flex-col sm:flex-row justify-between items-center border rounded-lg p-4 mb-4 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-40 h-40 hidden sm:block lg:block">
          <Image
            src={property.website_image}
            alt={property.property_name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <a
            href={`https://${property.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 inset-x-0 bg-white bg-opacity-70 text-center py-1 rounded-b-lg transition-transform transform hover:scale-105"
            style={{ textDecoration: "none" }}
          >
            Visit Website
          </a>
        </div>

        <Link
          href={`https://${property.website}`}
          className="sm:hidden lg:hidden block text-blue-500 hover:underline"
        >
          Visit Website
        </Link>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {property.property_name}
          </h2>
          <p className="text-gray-500">
            Property code: {property.property_code}
          </p>
          <p>
            Check in: {property.check_in} Check out: {property.check_out}
          </p>
          <div className="flex flex-wrap items-center space-x-2 mt-2 lg:space-x-4">
            <div className="flex items-center">
              <Image
                src="/bed.png"
                alt="Bedrooms"
                width={20}
                height={20}
              />
              <span className="ml-2">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/adult.png"
                alt="Adults"
                width={20}
                height={20}
              />
              <span className="ml-2">{property.adults} Adults</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/child.png"
                alt="Children"
                width={20}
                height={20}
              />
              <span className="ml-2">{property.children} Children</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/park.png"
                alt="Parking"
                width={20}
                height={20}
              />
              <span className="ml-2">{property.parking} Parking</span>
            </div>
            <div className="flex items-center">
              <Image src="/pet.png" alt="Pets" width={20} height={20} />
              <span className="ml-2">{property.pets} Pets</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 sm:mt-0">
        <span className="text-xl font-bold text-purple-500">
          ${property.price.toFixed(2)}
        </span>
        <button className="mt-2 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
          Select
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
