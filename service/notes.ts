import request from "@/utils/request";

export const getAllNotes = async (page: number, limit: number) => {
  const { data } = await request.get(
    `/note/get-notes?page=${page}&&limit=${limit}`
  );
  return data;
};

export const createNote = async (
  title: string,
  content: string,
  note_tags: string[]
) => {
  const { data } = await request.post(`/note/create`, {
    title,
    content: content ? content : "",
    note_tags,
  });
  return data;
};
//
export const noteDetails = async (note_id: string) => {
  const { data } = await request.get(`/note/details/${note_id}`);
  return data;
};
