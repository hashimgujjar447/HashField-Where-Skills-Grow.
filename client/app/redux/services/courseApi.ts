import { api } from "./api";
import {
  GetAllCoursesResponse,
  GetSingleCourseResponse,
} from "@/app/types/course";

const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => "/get-all-courses",
      providesTags: ["Course"],
    }),

    getSingleCourseWithOutAuth: builder.query<GetSingleCourseResponse, string>({
      query: (courseId: string) => `/get-course/${courseId}`,
      providesTags: ["Course"],
    }),

    createCourse: builder.mutation({
      query: (body) => ({
        url: "/create-course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseWithOutAuthQuery,
  useCreateCourseMutation,
} = courseApi;
