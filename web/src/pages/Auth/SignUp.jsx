import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SignUpSchema } from "./validation/SignUpSchema";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SelectField, TextInputField } from "../../modules/wotsabot/components/FormFields";
import axios from "axios";
import { SignUpSchema } from "./validation/SignUpSchema";
import { useAuthStore } from "../../store/authStore";
import { Loader } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [schema, setSchema] = useState(SignUpSchema([], [])); // Initialize schema
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [divisionsResponse, departmentsResponse] = await Promise.all([
          axios.get("http://localhost:5002/api/divisions"),
          axios.get("http://localhost:5002/api/departments"),
        ]);

        // Transform the responses to the required format
        const formatOptions = (data) =>
          data.map(({ _id, name }) => ({ value: _id, label: name }));

        const divisions = formatOptions(divisionsResponse.data);
        const departments = formatOptions(departmentsResponse.data);

        // Set options and update schema
        setDivisionOptions(divisions);
        setDepartmentOptions(departments);
        setSchema(SignUpSchema(divisions, departments));

        // Reset the form after options are fetched
        reset({});
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [reset]);

  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      divisionId,
      departmentId,
    } = data;

    try {
      await signup(
        firstName,
        lastName,
        username,
        email,
        password,
        divisionId,
        departmentId
      );

      // Navigate to the sign-in page
      navigate("../verify-email");

      // Handle and display error
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center bg-white px-16 py-12 rounded-lg shadow-lg">
        <div className="">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-sm text-gray-500 mb-12 mt-2 ml-1">
            Sign up to access crm features
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
              {error && (
                <p className="text-red-500 font-semibold mb-2">{error}</p>
              )}
              <div className="">
                <TextInputField
                  name="firstName"
                  register={register}
                  label="First Name"
                  placeholder="First Name"
                  errors={errors}
                />
              </div>
              <div className="">
                <TextInputField
                  name="lastName"
                  register={register}
                  label="Last Name"
                  placeholder="Last Name"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mb-4">
              <TextInputField
                name="username"
                register={register}
                label="Username"
                placeholder="Username"
                errors={errors}
              />
            </div>
            <div className="mb-4">
              <TextInputField
                name="email"
                register={register}
                label="Email"
                placeholder="Email"
                errors={errors}
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <TextInputField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  register={register}
                  label="Password"
                  placeholder="Password"
                  errors={errors}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-8 text-gray-600 hover:text-gray-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="">
                <SelectField
                  name="divisionId"
                  register={register}
                  label="Division ID"
                  placeholder="Division ID"
                  options={divisionOptions}
                  errors={errors}
                />
              </div>
              <div className="mb-4">
                <SelectField
                  name="departmentId"
                  register={register}
                  label="Department ID"
                  placeholder="Department ID"
                  options={departmentOptions}
                  errors={errors}
                />
              </div>
            </div>

            <button
              type="submit"
              name="signUp"
              className="flex items-center justify-center w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Create an account"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="../login"
                className="text-sm text-blue-400 hover:text-blue-600"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
