import request from "@/utils/request";

export const getAllNotes = async (page: number, limit: number) => {
  const { data } = await request.get(
    `/note/get-notes?page=${page}&&limit=${limit}`
  );
  return data;
};
