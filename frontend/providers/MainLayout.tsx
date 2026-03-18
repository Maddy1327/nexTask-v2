"use client";
import Modal from "@/app/Components/Modal/Modal";
import ProfileModal from "@/app/Components/Profile/ProfileModal";
import { useTasks } from "@/context/taskContext";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isEditing, profileModal } = useTasks();
  return (
    <div className="main-layout flex-1 min-h-0 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-visible md:overflow-auto">
      {isEditing && <Modal />}
      {profileModal && <ProfileModal />}
      <div className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="px-6 py-4 text-center text-sm text-[#666]">
          &copy; Copyright Madhav 2026
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
