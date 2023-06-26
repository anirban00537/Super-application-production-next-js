import { getAllNotes } from "@/service/notes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetNotes = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
  });
  const { data, isLoading } = useQuery({
    retry: 0,
    queryKey: ["get-notes"],
    queryFn: () => getAllNotes(pagination.page, pagination.limit),
    onSuccess: async (data) => {
      console.log(data);
    },
  });
  return { data, isLoading };
};
