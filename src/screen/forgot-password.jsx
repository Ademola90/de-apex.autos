import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/inputs";
import { Buttons } from "../components/buttons";
import api from "../utils/api";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", {
        email: formData.email,
      });
      toast.success(response.data.message || "OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      toast.success(response.data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center text-2xl font-bold mb-5">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </p>
        {step === 1 && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              css="border border-mainBlue h-[40px] w-full mt-1 px-2"
              required
            />
            <Buttons
              type="button"
              onClick={handleSendOTP}
              text={isLoading ? "Sending OTP..." : "Send OTP"}
              css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300 w-full"
              disabled={isLoading}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="otp"
            >
              OTP
            </label>
            <Input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              css="border border-mainBlue h-[40px] w-full mt-1 px-2"
              required
            />
            <label
              className="block text-sm font-medium text-gray-700 mt-4"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                css="border border-mainBlue h-[40px] w-full mt-1 px-2 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2 mt-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <Buttons
              type="button"
              onClick={handleResetPassword}
              text={isLoading ? "Resetting Password..." : "Reset Password"}
              css="bg-mainBlue text-whiteColor font-Poppins text-base font-normal px-4 py-2 mt-5 hover:scale-105 ease-in duration-300 w-full"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
      <p
        onClick={() => navigate("/login")}
        className="mt-5 text-mainBlue font-Poppins text-sm cursor-pointer"
      >
        Back to Login
      </p>
    </div>
  );
};

export default ForgotPassword;
