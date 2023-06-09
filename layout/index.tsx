"use client";

import { Database } from "@/lib/database.types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "@/sections/Loading";
import { useCheckAuthState } from "@/hooks/authentication.hook";

const Layout = ({ children }: any) => {
  const { user, isLoggedIn, loading } = useAppSelector((state) => state.user);
  useCheckAuthState();
  if (loading) return <LoadingComponent />;

  return <div>{children}</div>;
};

export default Layout;
