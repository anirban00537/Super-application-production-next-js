import LabelMedium from "@/components/Label/LabelMedium.comp";
import ModalElement from "@/components/Modal/index.comp";
import { useCreateNote } from "@/hooks/notes.hook";
import { tagsCreateType } from "@/types";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { Label } from "flowbite-react";
import React from "react";

const CreateNoteModal = ({
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  const {
    handleAddTag,
    handleSubmit,
    setOpenModal,
    openModal,
    tagsList,
    tagsRef,
    titleRef,
    handleRemove,
  } = useCreateNote(refetch);

  return (
    <div>
      <ModalElement
        buttonTitle="Create A New Note"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create a New Note
          </h3>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <input
                id="title"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={titleRef}
                placeholder="Enter note title"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="tags" value="Tags" />
              </div>
              <div className="flex justify-between">
                <input
                  id="tags"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={tagsRef}
                  placeholder="Enter a tag"
                  // required
                />
                <button
                  className="bg-gradient-to-br from-purple-500 to-orange-400 p-2 text-white ml-2 rounded-md text-base"
                  type="button"
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              <div className="mt-5">
                {tagsList.map((tag: tagsCreateType) => (
                  <LabelMedium title={tag.title} handleRemove={handleRemove} />
                ))}
              </div>
            </div>
            <button
              className="bg-gradient-to-br mt-5 from-red-500 to-orange-400 p-2 text-white w-full
               rounded-md text-base"
              type="submit"
            >
              Create Note
            </button>
          </form>
        </div>
      </ModalElement>
    </div>
  );
};

export default CreateNoteModal;
