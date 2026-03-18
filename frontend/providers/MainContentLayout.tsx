"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const userId = useUserContext().user.id;

  return (
    <main
      className={`${
        userId ? "lg:pr-[20rem]" : ""
      } pb-[6.5rem] md:pb-[1.5rem] flex flex-col lg:flex-row flex-1 min-h-0`}
    >
      {children}
    </main>
  );
}

export default MainContentLayout;
