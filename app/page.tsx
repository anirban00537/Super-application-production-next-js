"use client";

import Navbar from "@/components/Navbar/index.comp";
import { Database } from "@/lib/database.types";
import MiddleSection from "@/sections/Home/middle.section";
import TopSection from "@/sections/Home/top.sectionn";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [userCredentials, setUserCredentials] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const fetchUserCredentials = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserCredentials(user);
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchUserCredentials();
  }, []);

  return (
    <>
      <Navbar />
      <TopSection />
      <MiddleSection />
    </>
  );
}
