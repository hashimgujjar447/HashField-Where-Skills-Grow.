import { api } from "./api";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail?: {
    public_id: string;
    url: string;
  };
  tags: string[];
  level: string;
  ratings: number;
  purchased: number;
}

interface GetAllCoursesResponse {
  success: boolean;
  courses: Course[];
}

const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => "/get-all-courses",
      providesTags: ["Course"],
    }),
  }),
});

export const { useGetAllCoursesQuery } = courseApi;
