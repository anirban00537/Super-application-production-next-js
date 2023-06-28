import { getAllNotes } from "@/service/notes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetNotes = () => {
  let pagination = {
    page: 1,
    limit: 1,
  };
  const { data, isLoading, refetch } = useQuery({
    retry: 0,
    queryKey: ["get-notes", pagination.page, pagination.limit],
    queryFn: () => getAllNotes(pagination.page, pagination.limit),
    keepPreviousData: true,
  });

  const handlePaginationChange = (page: number, limit = 1) => {
    pagination.page = page;
    pagination.limit = limit;
    refetch();
  };

  return { data, isLoading, handlePaginationChange };
};
