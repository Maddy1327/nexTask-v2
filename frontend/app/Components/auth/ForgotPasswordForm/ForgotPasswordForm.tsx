"use client";
import Link from "next/link";
import React from "react";

function ForgotPasswordForm() {
  return (
    <div className="relative m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Forgot your password?
        </h1>
        <p className="mt-4 text-center text-[15px] leading-7 text-[#666]">
          Password reset is not available in the app right now.
          <br />
          Please contact the developer to reset your password.
        </p>
        <div className="mt-8 flex">
          <Link
            href="/login"
            className="flex-1 px-4 py-3 text-center font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
      <img src="/flurry.png" alt="" />
    </div>
  );
}

export default ForgotPasswordForm;
