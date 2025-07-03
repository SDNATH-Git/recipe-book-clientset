import React, { useState, useContext, useEffect } from "react";
import Lottie from "lottie-react";
import login from "../../assets/forget.json";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail = location.state?.email || "";

  const [email, setEmail] = useState(passedEmail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (passedEmail) {
      setEmail(passedEmail);
    }
  }, [passedEmail]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Redirecting to Sign In...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-5 py-3 border border-orange-400 text-orange-500 bg-gray-800 " +
    "placeholder-orange-300 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-4xl text-orange-400">
        <h2 className="text-3xl font-bold text-center mb-8">Reset Your Password</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <Lottie animationData={login} loop={true} />
          </div>

          <form onSubmit={handleReset} className="w-full md:w-1/2 space-y-6">
            <div>
              <label className="block text-lg mb-1 text-orange-300">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputStyle}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg rounded-md text-white font-medium ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 transition-colors btn py-6"
              }`}
            >
              {loading ? "Sending reset email..." : "Reset Password"}
            </button>
          </form>
        </div>

        <p className="text-sm text-center text-orange-300 mt-6">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 font-semibold hover:underline cursor-pointer"
          >
            Go back to Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
