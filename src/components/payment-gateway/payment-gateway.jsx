"use client";
import { useState } from "react";
import { Check, CreditCard, Upload, AlertCircle, Copy } from "lucide-react";

const PaymentGateway = ({ paymentMethod, setPaymentMethod, totalAmount }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [copied, setCopied] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Format expiry date
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    setExpiryDate(value);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  // Copy account number to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock function for processing payment
  const processPayment = () => {
    setIsProcessing(true);
    // Simulate API call to PayStack
    setTimeout(() => {
      setIsProcessing(false);
      // Handle success or redirect
    }, 2000);
  };

  return (
    <div className="mt-6">
      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4 text-blackColor">
            Card Details
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                />
                <CreditCard
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-mainBlue focus:border-mainBlue"
                />
              </div>
            </div>

            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="w-full bg-mainBlue text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay ₦${totalAmount?.toLocaleString() || "0"}`
              )}
            </button>

            <div className="flex items-center justify-center mt-4">
              <img
                src="/placeholder.svg?height=30&width=60"
                alt="Visa"
                className="h-6 mx-2"
              />
              <img
                src="/placeholder.svg?height=30&width=60"
                alt="Mastercard"
                className="h-6 mx-2"
              />
              <img
                src="/placeholder.svg?height=30&width=60"
                alt="Verve"
                className="h-6 mx-2"
              />
            </div>

            <div className="text-xs text-center text-gray-500 mt-2">
              Secured by PayStack. Your card details are encrypted.
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Form */}
      {paymentMethod === "bank_transfer" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4 text-blackColor">
            Bank Transfer Details
          </h3>

          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-mainBlue mr-2 mt-0.5" />
              <p className="text-sm text-gray-700">
                Please make a transfer to the account below. Your booking will
                be confirmed once payment is verified.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Bank Name</span>
                <span className="font-medium">First Bank of Nigeria</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Account Name</span>
                <span className="font-medium">De Apex Autos Ltd</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Account Number</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">0123456789</span>
                  <button
                    onClick={() => copyToClipboard("0123456789")}
                    className="text-mainBlue hover:text-blue-700"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Amount to Pay</span>
                <span className="font-semibold text-lg">
                  ₦{totalAmount?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Reference</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">
                    CAR{Math.floor(Math.random() * 10000)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(`CAR${Math.floor(Math.random() * 10000)}`)
                    }
                    className="text-mainBlue hover:text-blue-700"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proof of Payment
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  id="proof"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="proof" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {proofFile
                      ? proofFile.name
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>
            </div>

            <button className="w-full bg-mainBlue text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 mt-4">
              Confirm Payment
            </button>
          </div>
        </div>
      )}

      {/* Cash on Pickup Form */}
      {paymentMethod === "cash" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-4 text-blackColor">
            Cash on Pickup
          </h3>

          <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <Check size={20} className="text-green-500 mr-2 mt-0.5" />
              <p className="text-sm text-gray-700">
                You've selected to pay with cash when you pick up the vehicle.
                Please note the following:
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Payment Details</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-mainBlue mt-1.5 mr-2"></span>
                  <span>
                    Total amount to be paid:{" "}
                    <span className="font-semibold">
                      ₦{totalAmount?.toLocaleString() || "0"}
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-mainBlue mt-1.5 mr-2"></span>
                  <span>
                    Payment must be made in full before the vehicle is released
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-mainBlue mt-1.5 mr-2"></span>
                  <span>We accept Nigerian Naira (₦) only</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-mainBlue mt-1.5 mr-2"></span>
                  <span>A receipt will be provided upon payment</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Pickup Location</h4>
              <p className="text-sm text-gray-700 mb-2">De Apex Autos Office</p>
              <p className="text-sm text-gray-700">
                123 Victoria Island, Lagos, Nigeria
              </p>
            </div>

            <button className="w-full bg-mainBlue text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 mt-4">
              Confirm Booking
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              By confirming, you agree to our terms and conditions regarding
              cash payments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
