"use client";

import { Database } from "@/lib/database.types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { login } from "@/state/reducer/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "@/sections/Loading";

const Layout = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.user);

  const supabase = createClientComponentClient<Database>();
  const fetchUserCredentials = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        dispatch(login(user));
        setLoading(false);
      } else {
        await router.push("/");
        await setLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchUserCredentials();
  }, []);
  if (loading) return <LoadingComponent />;

  return <div>{children}</div>;
};

export default Layout;
