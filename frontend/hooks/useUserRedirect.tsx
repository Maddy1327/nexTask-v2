"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.email)) {
      router.push(redirect);
    }

    // watch for changes to user, redirect, router
  }, [user, redirect, router, loading]);
};

export default useRedirect;
