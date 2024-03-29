import { ColumnInterface } from "react-table";

export interface noteType {
  id: number;
  title: string;
  content: object;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  note_tags: tagType[];
}
export type noteDataType = {
  title: string;
  tagsList: string[];
};
export interface updateNoteType {
  id: number;
  title: string;
  content: object;
  note_tags: tagType[];
}
export interface updateNoteType {
  id: number;
  title: string;
  content: object;
  note_tags: tagType[];
}

export type updateNoteTitleType = {
  id: number;
  title: any;
};
export type labelMediumType = {
  title: any;
  handleRemove: any;
};
export type tagsCreateType = {
  id: number;
  title: string;
};
export interface tagType {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
export type Column = {
  Header: string;
  accessor: string;
  Cell?: React.FC<{ value: any }>;
};
export type DataTableProps = {
  columns: ColumnInterface[];
  data: any[];
  dataWithPagination: any[];
  handlePaginationChange: (page: number) => void;
  search?: boolean;
};
