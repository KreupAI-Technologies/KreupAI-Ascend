import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./validation/SignInSchema";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ClapSpinner from "../../components/ui/ClapSpinner";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
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
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(data);
    setIsCreating(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === data.email &&
      storedUser.password === data.password
    ) {
      navigate("../home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="grid sm:grid-cols-2">
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-1/2">
        <h1 className="text-3xl font-bold ">Welcome back</h1>
        <p className="text-sm font-light text-gray-600 mb-16 mt-2 ml-1 ">Please enter your details to sign in</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...register("email")}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
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
              <Link to="#" className="text-sm text-blue-400 hover:text-blue-600">
                Forgot password
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
              disabled={isCreating}
            >
              {isCreating ? <ClapSpinner /> : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="../sign-up"
                className="text-sm text-blue-400 hover:text-blue-600"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-screen p-4">
        <img
          src="/images/bg-1.jpg"
          alt="bg"
          className="object-cover h-full w-full rounded-xl"
        />
      </div>
    </div>
  );
}

export default SignIn;
