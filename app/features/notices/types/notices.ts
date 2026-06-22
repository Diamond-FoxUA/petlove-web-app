import type { Notice } from "@/app/shared/types/noticesTypes";

export interface GetNoticesResponse {
  results: Notice[];
  totalPages: number;
  page: number;
  perPage: number;
}
