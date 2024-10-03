import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./validation/SignInSchema";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    const { username, password } = data;
    await login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center bg-white px-16 py-12 rounded-lg shadow-lg">
        <div className="">
          <h1 className="text-3xl font-bold ">Welcome back</h1>
          <p className="text-sm font-light text-gray-600 mb-16 mt-2 ml-1 ">
            Please enter your details to sign in
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                {...register("username")}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-5 text-gray-600 hover:text-gray-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end">
              <Link
                to="../forgot-password"
                className="text-sm text-blue-400 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 leading-tight"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="../signup"
                className="text-sm text-blue-400 hover:text-blue-600"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
