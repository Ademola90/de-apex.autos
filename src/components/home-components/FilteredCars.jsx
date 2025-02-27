import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import CarCard from "./CarCard"; // Assuming CarCard is in the same directory

const FilteredCars = () => {
  const { brand } = useParams();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarsByBrand = async () => {
      try {
        const response = await api.get(`/car/public-cars?make=${brand}`);
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars by brand:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarsByBrand();
  }, [brand]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading cars...</div>;
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <h2 className="text-2xl font-bold mb-4">{brand} Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No cars available for {brand}
          </p>
        )}
      </div>
    </div>
  );
};

export default FilteredCars;
