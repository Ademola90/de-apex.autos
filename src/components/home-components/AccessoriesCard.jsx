import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import useStore from "../../data/store/store";

const CarAccessoriesCard = () => {
  const [accessories, setAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/accessory/accessories");
        setAccessories(response.data.accessories);
      } catch (error) {
        console.error(
          "Error fetching accessories:",
          error.response?.data || error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const handleViewDetails = (accessoryId) => {
    if (!user) {
      toast.info("Please log in to view accessory details.");
      navigate("/login");
      return;
    }
    navigate(`/accessory-details/${accessoryId}`);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading accessories...</div>;
  }

  return (
    <div className="lg:px-16 md:px-10 px-8 mt-10">
      <div className=" py-10">
        <p className="text-textBlue font-Poppins lg:text-xl md:text-xl text-lg font-medium text-center ">
          Find Your Car Accessories
        </p>
        <h2 className="text-center font-Poppinsr lg:text-4xl md:text-4xl text-3xl font-bold mt-3">
          Experience the Best Car Accessories
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {accessories.length > 0 ? (
          accessories.slice(0, 12).map((accessory) => (
            <div
              key={accessory._id}
              className="border shadow-md py-3 flex flex-col items-center hover:scale-105 cursor-pointer"
              onClick={() => handleViewDetails(accessory._id)}
            >
              {accessory.images && accessory.images.length > 0 ? (
                <img
                  src={
                    accessory.images[0].startsWith("http")
                      ? accessory.images[0]
                      : `${process.env.NEXT_PUBLIC_API_URL}${accessory.images[0]}`
                  }
                  alt={`${accessory.name}`}
                  className="w-[251px] h-[155px] object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=155&width=251";
                    e.target.onerror = null;
                  }}
                />
              ) : (
                <div className="w-[251px] h-[155px] bg-gray-200 flex items-center justify-center rounded">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}

              <div className="px-5 w-full">
                <h3 className="text-lg font-bold mt-2 truncate font-Poppins">
                  {accessory.name}
                </h3>
                {/* <p className="text-gray-500 text-sm font-Poppins">
                  {accessory.category}
                </p>
                <p className="text-gray-500 text-sm font-Poppins">
                  {accessory.make}
                </p> */}
                <p className="text-gray-500 text-sm font-Poppins truncate">
                  {accessory.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg">
                    #{parseInt(accessory.price, 10).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No accessories available
          </p>
        )}
      </div>

      <div className=" justify-center flex items-center mt-10 ">
        <button
          onClick={() => navigate("/accessories")}
          className=" bg-mainBlue text-whiteColor font-Poppins text-base px-4 py-2 rounded-md"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default CarAccessoriesCard;
