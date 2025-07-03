import React, { useContext, useState } from "react";
import login from "../../assets/login.json";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, setUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const inputStyle =
    "w-full px-5 py-3 border border-orange-400 text-orange-500 bg-gray-800 " +
    "placeholder-orange-300 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const emailInput = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(emailInput, password);
      const user = result.user;
      setUser(user);
      toast.success("Login successful!");
      form.reset();
      setEmail("");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;
      setUser(user);
      toast.success("Google sign-in successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-5xl text-orange-400">
        <h2 className="text-3xl font-bold text-center mb-10">Sign in to your account</h2>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2">
            <Lottie animationData={login} loop={true} />
          </div>

          <form onSubmit={handleLogin} className="w-full md:w-1/2 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-lg mb-2 text-orange-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg mb-2 text-orange-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className={`${inputStyle} pr-12`}
                  required
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-orange-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgetPassword"
                state={{ email }}
                className="text-sm text-orange-300 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-6 rounded-md text-lg font-medium btn text-white ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 transition-colors"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <hr className="flex-grow border-orange-300" />
              <span className="text-orange-300 text-sm">or</span>
              <hr className="flex-grow border-orange-300" />
            </div>

            {/* Google Login */}
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 bg-white border border-orange-300 px-5 py-6 rounded-md shadow-md hover:shadow-lg transition-shadow text-lg w-full text-black font-semibold btn "
                disabled={loading}
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-8 text-sm text-orange-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
