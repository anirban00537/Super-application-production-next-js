"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoadingComponent from "@/sections/Loading";
const inter = Inter({ subsets: ["latin"] });
import "flowbite/dist/flowbite.css";

export const metadata = {
  title: "Feedlio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const fetchUserCredentials = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserCredentials(user);
        console.log(user, "useruseruser");
        setLoading(false);
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
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />

        {loading ? <LoadingComponent /> : children}
      </body>
    </html>
  );
}
