import { getAllNotes, createNote, noteDetails } from "@/service/notes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

export const useGetNotes = () => {
  let pagination = {
    page: 1,
    limit: 10,
  };
  const { data, isLoading, refetch } = useQuery({
    retry: 0,
    queryKey: ["get-notes", pagination.page, pagination.limit],
    queryFn: () => getAllNotes(pagination.page, pagination.limit),
    keepPreviousData: true,
  });

  const handlePaginationChange = (page: number, limit = 10) => {
    pagination.page = page;
    pagination.limit = limit;
    refetch();
  };

  return { data, isLoading, handlePaginationChange };
};

export const useCreateNote = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [tagsList, setTags] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();

  const handleAddTag = () => {
    const tag = tagsRef.current?.value?.toString();
    if (tag) {
      setTags([...tagsList, tag]);
      tagsRef.current!.value = "";
    }
  };

  const createNoteMutation = useMutation(
    (noteData: { title: string; tagsList: string[] }) =>
      createNote(noteData.title, "", noteData.tagsList)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value ?? "";
    const response = await createNoteMutation.mutateAsync({ title, tagsList });
    if (response.success) {
      toast.success(response.message);
    }

    // Reset form fields
    titleRef.current!.value = "";
    tagsRef.current!.value = "";
    setOpenModal(undefined);
  };

  return {
    titleRef,
    tagsRef,
    tagsList,
    setTags,
    handleAddTag,
    handleSubmit,
    createNoteMutation,
    setOpenModal,
    openModal,
  };
};
export const useNoteEditor = () => {
  const updateNote = async (id: any, content: any) => {
    // const noteRef = doc(db, "notes", id);
    console.log(content, "content");
    // await updateDoc(noteRef, { content: content });
  };
  return { updateNote };
};
export const useGetDetails = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, refetch } = useQuery({
    retry: 0,
    queryKey: ["get-note-details"],
    queryFn: () => noteDetails(String(id)),
    // keepPreviousData: true,
    enabled: id ? true : false,
  });

  return { noteDetails: data?.data };
};
