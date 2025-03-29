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
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
