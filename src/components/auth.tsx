"use client";

import { useUser } from "@/hooks/user";
import { getUrl } from "@/utils/url";
import { redirect, usePathname } from "next/navigation";
import React from "react";

type AuthProtectedProps = {
  children: React.ReactNode;
};

export default function AuthProtected({ children }: AuthProtectedProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
