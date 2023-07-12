"use client";

import { useAppDispatch, useAppSelector } from "@/state/hooks";

import { useCheckAuthState } from "@/hooks/authentication.hook";

const Layout = ({ children }: any) => {
  const { user } = useAppSelector((state) => state.user);
  useCheckAuthState();
  // if (loading) return <LoadingComponent />;

  return <div>{children}</div>;
};

export default Layout;
