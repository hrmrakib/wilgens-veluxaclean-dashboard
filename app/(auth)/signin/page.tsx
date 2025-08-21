"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/feature/authAPI";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/service/authService";
import { toast } from "sonner";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const router = useRouter();

  const [login] = useLoginMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });

      console.log(res);

      if (res?.data?.success) {
        toast.success("Login successful!");
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        localStorage.setItem("refreshToken", res?.data?.data?.refreshToken);
        await saveTokens(res?.data?.data?.accessToken);
        // setSubmitSuccess(true);
        router.push("/");
      }

      // In a real app, you would redirect to dashboard or home page after successful login
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Invalid credentials. Please try again." });
      toast.error(error?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className='w-full min-h-screen bg-[url(/auth-bg.png)] flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      {/* Overlay for better text visibility */}

      <div className='container mx-auto flex flex-col md:flex-row items-center z-50'>
        {/* Logo Section */}

        {/* Form Section */}
        <div className='w-full md:w-1/2 max-w-lg mx-auto bg-authFormBg px-6 py-16 rounded-xl'>
          <div className='text-center mb-6'>
            <h1 className='text-[32px] font-bold text-authFormColor mb-2'>
              Sign In Now
            </h1>
            <p className='text-authFormColor text-lg'>
              Welcome back! Select method log in
            </p>
          </div>

          {submitSuccess ? (
            <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6'>
              Sign in successful! Redirecting to your dashboard...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='relative mb-4'>
                <label
                  htmlFor='email'
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] text-lg font-medium'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z'
                      stroke='#B0B0B0'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email...'
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-inputBg text-authFormColor pl-12 w-full p-3  placeholder:text-[#B0B0B0] ${
                    errors.email ? "border-red-500" : "border-slate-300"
                  } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <div className='relative mb-4'>
                <label
                  htmlFor='email'
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] text-lg font-medium'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 7C16.1046 7 17 7.89543 17 9M21 9C21 12.3137 18.3137 15 15 15C14.3938 15 13.8087 14.9101 13.2571 14.7429L11 17H9V19H7V21H4C3.44772 21 3 20.5523 3 20V17.4142C3 17.149 3.10536 16.8946 3.29289 16.7071L9.25707 10.7429C9.08989 10.1914 9 9.60617 9 9C9 5.68629 11.6863 3 15 3C18.3137 3 21 5.68629 21 9Z'
                      stroke='#B0B0B0'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </label>

                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-inputBg text-authFormColor pl-12 w-full p-3  placeholder:text-[#B0B0B0] ${
                      errors.password ? "border-red-500" : "border-slate-300"
                    } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    name='remember'
                    checked={formData.remember}
                    onChange={handleChange}
                    className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='remember'
                    className='ml-2 text-lg text-authFormColor font-medium'
                  >
                    Remember
                  </label>
                </div>
                <Link
                  href='/forget-password'
                  className='text-lg font-medium text-authFormColor hover:underline'
                >
                  Forget Password?
                </Link>
              </div>

              {errors.submit && (
                <p className='text-red-500 text-sm'>{errors.submit}</p>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-button text-buttonColor text-lg font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out'
              >
                {isSubmitting ? "Signing In..." : "Sign In Now"}
              </button>
            </form>
          )}

          {/* <div className='text-center mt-6'>
            <p className='text-[#8A8A8A] text-lg'>
              Don&apos;t have an account?{" "}
              <Link
                href='/create-account'
                className='text-[#E6E6E6] text-lg font-medium hover:underline'
              >
                Sign Up Now
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </main>
  );
}
