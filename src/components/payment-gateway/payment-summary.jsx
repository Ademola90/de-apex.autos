import { Calendar, Clock, Car } from "lucide-react";

const PaymentSummary = ({
  car,
  startDate,
  endDate,
  totalDays,
  totalAmount,
  additionalServices = [],
}) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 text-blackColor">
        Booking Summary
      </h3>

      {/* Car Details */}
      <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
        <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
          <img
            src={car?.images?.[0]?.secure_url || "/placeholder.svg"}
            alt={car?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-blackColor">
            {car?.name || "Car Name"}
          </h4>
          <p className="text-sm text-gray-500">
            {car?.transmission || "Automatic"} • {car?.fuelType || "Petrol"}
          </p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-start">
          <Calendar size={18} className="text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Pickup Date</p>
            <p className="text-sm text-gray-600">
              {formatDate(startDate) || "Not specified"}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Calendar size={18} className="text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Return Date</p>
            <p className="text-sm text-gray-600">
              {formatDate(endDate) || "Not specified"}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock size={18} className="text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-sm text-gray-600">
              {totalDays || 0} {totalDays === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <Car size={18} className="text-gray-500 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Pickup Location</p>
            <p className="text-sm text-gray-600">
              {car?.location || "Lagos Office"}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Daily Rate</span>
          <span className="text-sm">
            ₦{car?.price?.toLocaleString() || "0"}/day
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="text-sm">
            × {totalDays || 0} {totalDays === 1 ? "day" : "days"}
          </span>
        </div>

        {/* Additional Services */}
        {additionalServices && additionalServices.length > 0 && (
          <>
            {additionalServices.map((service, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-gray-600">{service.name}</span>
                <span className="text-sm">
                  ₦{service.price.toLocaleString()}
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center font-medium">
        <span>Total Amount</span>
        <span className="text-lg text-mainBlue">
          ₦{totalAmount?.toLocaleString() || "0"}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummary;
