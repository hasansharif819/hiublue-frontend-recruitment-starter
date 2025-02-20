"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthCheck;
