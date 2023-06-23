//@ts-ignore
import Cookies from "js-cookie";

import { processResponse } from "@/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  verifyEmailApi,
  ResetPasswordApi,
  forgotPasswordApi,
  loginApi,
  signupApi,
} from "@/service/authentication";
import { setUser } from "@/state/reducer/user";
import { GetUserProfile } from "@/service/user";
import { useState } from "react";

export const useSignin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return loginApi(data.email, data.password);
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await mutateAsync({ email, password });
      processResponse(response);
      if (response.success) {
        router.push("/dashboard");
        Cookies.set("token", response?.data?.accessToken);
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleLogin, isLoading };
};
export const useSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return signupApi(
      data.email,
      data.password,
      data.first_name,
      data.last_name,
      data.nick_name
    );
  });

  const handleSignup = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    nick_name: string
  ) => {
    try {
      const data = await mutateAsync({
        email,
        password,
        first_name,
        last_name,
        nick_name,
      });
      processResponse(data);
      router.push("/verify-email");
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleSignup, isLoading };
};
export const useVerifyEmail = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation((data: any) => {
    return verifyEmailApi(data.email, data.code);
  });

  const handleVerifyCode = async (email: string, code: string) => {
    try {
      const data = await mutateAsync({ email, code });
      processResponse(data);
      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      processResponse(error);
    }
  };

  return { register, handleSubmit, errors, handleVerifyCode, isLoading };
};
export const useCheckAuthState = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    retry: 0,
    queryKey: ["user"],
    queryFn: () => GetUserProfile(),
    onSuccess: async (data) => {
      await setLoading(true);
      if (data.success === true) {
        await dispatch(setUser(data.data));
        setLoading(false);
      }
    },
    onError: async () => {
      await router.push("/login");
      await setLoading(false);
    },
    enabled: !!Cookies.get("token"),
  });

  return {
    loading: loading,
    user: userProfile?.data,
  };
};
