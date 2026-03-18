"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();
  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";
  return (
    <div className="m-6">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 dark:bg-white/5 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 dark:hover:bg-white/10 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white/60"
        onClick={openProfileModal}
      >
        <div>
          {user?.photo ? (
            <Image
              src={user.photo}
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full"
            />
          ) : (
            <div className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-bold">{userInitial}</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333] dark:text-[#f3f4f6]">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333] dark:text-[#f3f4f6]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Open Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333] dark:text-[#f3f4f6]">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333] dark:text-[#f3f4f6]">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-8 font-medium dark:text-[#f3f4f6]">Activity</h3>
    </div>
  );
}

export default Profile;
