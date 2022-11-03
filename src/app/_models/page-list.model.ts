export interface PageList {
  size: number;
  currentPage: number;
  empty: boolean;
  items: any[];
  firstPage: boolean;
  lastPage: boolean;
  totalItems: number;
  totalPages: number;
  content: any[];
}
