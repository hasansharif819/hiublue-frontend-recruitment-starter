"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthCheck;
