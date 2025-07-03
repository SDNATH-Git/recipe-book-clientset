import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import login from "../../assets/register.json";
import { MdHelpCenter } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase/firebase.config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const inputStyle =
    "w-full px-6 py-4 border text-lg rounded-md focus:outline-none " +
    "focus:ring-2 text-orange-500 border-orange-400 focus:ring-orange-600 " +
    "bg-gray-800 placeholder-orange-300";

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must include at least one uppercase letter.");
      return false;
    }
    if (!hasLowercase) {
      toast.error("Password must include at least one lowercase letter.");
      return false;
    }
    if (!isValidLength) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photoURL = form.photoURL.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    setLoading(true);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration successful!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google sign-in successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4 p-6">
      <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-6xl text-orange-500">
        <h2 className="text-4xl font-bold text-center mb-10 text-orange-400">
          Create a New Account
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <Lottie animationData={login} loop={true} />
          </div>

          <form onSubmit={handleRegister} className="w-full md:w-1/2 space-y-4">
            <div>
              <label className="block mb-2 text-lg text-orange-400">Username</label>
              <input type="text" name="username" placeholder="Enter your username" className={inputStyle} required />
            </div>
            <div>
              <label className="block mb-2 text-lg text-orange-400">Email</label>
              <input type="email" name="email" placeholder="Enter your email" className={inputStyle} required />
            </div>
            <div>
              <label className="block mb-2 text-lg text-orange-400">
                <div className="flex items-center gap-2">
                  <span>Photo URL</span>
                  <Link to="/what-is-photoURL">
                    <MdHelpCenter size={20} className="text-orange-400" />
                  </Link>
                </div>
              </label>
              <input type="text" name="photoURL" placeholder="Enter photo URL" className={inputStyle} />
            </div>
            <div className="relative">
              <label className="block mb-2 text-lg text-orange-400">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                className={`${inputStyle} pr-12`}
                required
              />
              <div
                className="absolute right-5 top-[60px] text-orange-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative">
              <label className="block mb-2 text-lg text-orange-400">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`${inputStyle} pr-12`}
                required
              />
              <div
                className="absolute right-5 top-[60px] text-orange-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-md text-xl font-semibold transition-colors text-white ${
                loading ? " bg-orange-300 cursor-not-allowed" :  " btn py-6 bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Sign Up
            </button>

            <div className="flex items-center gap-4 mt-2">
              <hr className="flex-grow border-t border-orange-300" />
              <p className="text-orange-300 text-sm">or</p>
              <hr className="flex-grow border-t border-orange-300" />
            </div>

            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 bg-white border border-orange-300 px-5 py-6 rounded-md shadow-md hover:shadow-lg transition-shadow text-lg w-full text-black btn  font-semibold"
                disabled={loading}
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        </div>

        <p className="text-sm text-center text-orange-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
