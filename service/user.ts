import request from "@/utils/request";

export const GetUserProfile = async () => {
  const { data } = await request.get("/user/profile");
  return data;
};
