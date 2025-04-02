"use client";
import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import useAuthStore from "../../store/auth";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await fetch("http://localhost:3001/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: firebaseUser.displayName,
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL,
            }),
          });

          const data = await res.json();

          setUser({
            ...firebaseUser,
            backendId: data.user._id, // 👈 Save backendId into Zustand store
          });
        } catch (err) {
          console.error("Failed to sync user with backend", err);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
