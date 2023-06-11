"use client";

import { useCheckAuthState } from "@/hooks/authentication.hook";

const Layout = ({ children }: any) => {
  useCheckAuthState();

  return <div>{children}</div>;
};

export default Layout;
