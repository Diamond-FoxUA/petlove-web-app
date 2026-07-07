import type { Notice } from "@/app/shared/types/noticesTypes";

export interface GetNoticesResponse {
  results: Notice[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CityResponse {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
}
