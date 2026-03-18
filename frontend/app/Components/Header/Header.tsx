"use client";
import { useTasks } from "@/context/taskContext";
import { useTheme } from "@/context/themeContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile, sun } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();
  const { name } = user;
  const userId = user.id;

  return (
    <header className="px-4 md:px-6 my-4 w-full flex flex-col gap-5 bg-[#f9f9f9] lg:flex-row lg:items-center lg:justify-between">
      <div className="text-center lg:text-left">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            {"\u{1F44B}"}
          </span>{" "}
          {userId ? `Welcome, ${name}!` : "Welcome to nexTask"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:h-[50px] lg:flex-row lg:items-center lg:gap-10">
        <div className="flex items-center justify-center gap-3 md:gap-4 lg:justify-start">
          <button
            type="button"
            className="h-[44px] w-[44px] rounded-full border border-[#d8d8d8] bg-white text-[#323232] transition-all duration-200 ease-in-out hover:border-[#3aafae] hover:text-[#3aafae]"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? sun : moon}
          </button>

          <button
            className="px-5 md:px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
            hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => {
              if (userId) {
                openModalForAdd();
              } else {
                router.push("/login");
              }
            }}
          >
            {userId ? "Add a new Task" : "Login / Register"}
          </button>
        </div>

        <div className="hidden sm:flex flex-col items-center justify-center">
          <div className="mb-2 text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse tracking-tight">
            Behind the Code
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/Maddy1327"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
            >
              {github}
            </Link>

            <Link
              href="https://portfolio-nextjs-dun-pi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
            >
              {profile}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
