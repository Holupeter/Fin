"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    // Simple redirect for demonstration
    router.push("/");
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100">
      {/* Top Logo Bar - visible on mobile/tablet, hidden on desktop */}
      <div className="flex lg:hidden flex-col justify-center items-center h-[69.76px] px-10 py-6 gap-10 w-full bg-grey-900 rounded-b-lg">
        <div className="flex flex-col items-center gap-2 w-full max-w-[560px]">
          <Image
            src="/assets/images/logo-large.svg"
            alt="Finance App Logo"
            width={121.45}
            height={21.76}
          />
        </div>
      </div>

      {/* Desktop Sidebar - hidden on mobile/tablet, visible on desktop */}
      <div className="hidden lg:flex flex-row items-center p-5 w-[600px] max-w-[600px] h-screen self-stretch flex-shrink-0">
        <div
          className="flex flex-col justify-between items-start p-10 gap-6 w-[560px] h-full rounded-xl flex-1"
          style={{
            background: `url(/assets/images/illustration-authentication.svg) center/cover no-repeat, #201F24`,
          }}
        >
          {/* Logo */}
          <Image
            src="/assets/images/logo-large.svg"
            alt="Finance App Logo"
            width={121.45}
            height={21.76}
          />

          {/* Bottom Text */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <h2 className="text-preset-1 text-white w-full">
                Keep track of your money and save for your future
              </h2>
              <p className="text-preset-4 text-white w-full">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center px-4 py-6 gap-8 md:px-10 md:py-8 md:gap-10 lg:px-10 lg:py-8 lg:gap-10 w-full h-[742.24px] md:h-[954.24px] lg:h-screen flex-1">
        {/* Modal / Sign Up Card */}
        <div className="flex flex-col items-start py-6 px-5 gap-8 md:p-8 w-[343px] md:w-[560px] max-w-[560px] h-[511px] md:h-[527px] bg-white rounded-xl mx-auto">
          {/* Title */}
          <h1 className="text-preset-1 text-grey-900">Sign Up</h1>

          {/* Content - Input Fields */}
          <div className="flex flex-col items-start gap-4 w-full">
            {/* Name Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="text-preset-5-bold text-grey-500 w-full">
                Name
              </label>
              <div className="flex flex-row items-center px-5 py-3 gap-4 w-full h-[45px] bg-white border border-beige-500 rounded-lg">
                <input
                  type="text"
                  className="w-full text-preset-4 text-grey-900 bg-transparent border-none outline-none placeholder:text-beige-500"
                  placeholder=""
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="text-preset-5-bold text-grey-500 w-full">
                Email
              </label>
              <div className="flex flex-row items-center px-5 py-3 gap-4 w-full h-[45px] bg-white border border-beige-500 rounded-lg">
                <input
                  type="email"
                  className="w-full text-preset-4 text-grey-900 bg-transparent border-none outline-none placeholder:text-beige-500"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="text-preset-5-bold text-grey-500 w-full">
                Create Password
              </label>
              <div className="relative flex flex-row items-center px-5 py-3 gap-4 w-full h-[45px] bg-white border border-beige-500 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full text-preset-4 text-grey-900 bg-transparent border-none outline-none flex-1 placeholder:text-beige-500"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center w-4 h-4 bg-transparent border-none p-0 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Image
                    src={
                      showPassword
                        ? "/assets/images/icon-hide-password.svg"
                        : "/assets/images/icon-show-password.svg"
                    }
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </div>
              <p className="text-preset-5 text-grey-500 text-right w-full mt-1">
                Passwords must be at least 8 characters
              </p>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="flex flex-row items-center gap-4 w-full h-[53px]">
            <button 
              onClick={handleSignUp}
              className="flex flex-row justify-center items-center p-4 gap-4 w-full h-[53px] bg-grey-900 rounded-lg cursor-pointer border-none hover:bg-grey-500 transition-colors"
            >
              <span className="text-preset-4-bold text-white">Create Account</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-row items-start gap-2">
              <span className="text-preset-4 text-grey-500">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="text-preset-4-bold text-grey-900 underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
