import {
  getAllNotes,
  createNote,
  noteDetails,
  updateNoteService,
  updateNoteTitleService,
} from "@/service/notes";
import {
  noteDataType,
  noteType,
  tagsCreateType,
  updateNoteTitleType,
  updateNoteType,
} from "@/types";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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

  return { data, isLoading, handlePaginationChange, refetch };
};

export const useCreateNote = (
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [tagsList, setTags] = useState<tagsCreateType[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const initialID = 0;
  const handleAddTag = () => {
    const tag = tagsRef.current?.value?.toString();
    if (tag) {
      setTags([...tagsList, { title: tag, id: initialID }]);
      tagsRef.current!.value = "";
    }
  };
  const handleRemove = () => {};

  const createNoteMutation = useMutation((noteData: noteDataType) =>
    createNote(noteData.title, "", noteData.tagsList)
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const preparedlist: string[] = [];
    tagsList.map((item: any) => {
      preparedlist.push(item.title);
    });

    const title = titleRef.current?.value ?? "";
    const response = await createNoteMutation.mutateAsync({
      title,
      tagsList: preparedlist,
    });
    if (response.success) {
      refetch();
      setTags([]);
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
    handleRemove,
  };
};
export const useNoteEditor = () => {
  const updateNoteMutation = useMutation((payload: updateNoteType) =>
    updateNoteService(payload)
  );
  const updateNoteTitleMutation = useMutation((payload: updateNoteTitleType) =>
    updateNoteTitleService(payload)
  );
  const updateNote = async (payload: updateNoteType, value: object) => {
    let updatedNote = {
      id: payload.id,
      note_tags: payload.note_tags,
      title: payload.title,
      content: value,
    };

    const response = await updateNoteMutation.mutateAsync(updatedNote);
    if (response.success) {
      toast.success(response.message);
    }
  };
  const removeTag=()
  const updateNoteTitle = async (id: number, title: string) => {
    let updatedNote = {
      id: id,
      title: title,
    };

    const response = await updateNoteTitleMutation.mutateAsync(updatedNote);
    if (response.success) {
      toast.success(response.message);
    }
  };

  return { updateNote, updateNoteTitle };
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
