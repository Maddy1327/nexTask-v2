"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { TasksProvider } from "../context/taskContext";
import { ThemeProvider } from "../context/themeContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <ThemeProvider>
      <UserContextProvider>
        <TasksProvider>{children}</TasksProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default UserProvider;
