import { loginApi, signupApi, verifyEmailApi } from "@/service/authentication";
//@ts-ignore
import Cookies from "js-cookie";

import { processResponse } from "@/utils/functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GetUserProfile } from "@/service/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/reducer/user";

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
  const dispatch = useDispatch();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    retry: 0,
    queryKey: ["user"],
    queryFn: () => GetUserProfile(),
    onSuccess: (data) => {
      if (data.success === true) {
        dispatch(setUser(data.data));
      }
    },
    onError: () => {
      router.push("/login");
    },
    enabled: !!Cookies.get("token"),
  });

  return {
    isLoading: isProfileLoading,
    user: userProfile?.data,
  };
};
