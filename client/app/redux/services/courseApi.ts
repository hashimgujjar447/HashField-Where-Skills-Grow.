import { api } from "./api";
import {
  EditCourseResponse,
  GetAllCoursesForAdminResponse,
  GetAllCoursesResponse,
  GetSingleCourseResponse,
} from "@/app/types/course";

const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => "/get-all-courses",
      providesTags: ["Course"],
    }),

    getAllCoursesForAdmin: builder.query<GetAllCoursesForAdminResponse, void>({
      query: () => "/get-all-courses-for-admin",
      providesTags: ["Course"],
    }),

    getSingleCourseWithOutAuth: builder.query<GetSingleCourseResponse, string>({
      query: (courseId: string) => `/get-course/${courseId}`,
      providesTags: ["Course"],
    }),

    deleteCourse: builder.mutation<void, string>({
      query: (courseId: string) => ({
        url: `/delete-course/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    createCourse: builder.mutation({
      query: (body) => ({
        url: "/create-course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    editCourse: builder.mutation<
      EditCourseResponse,
      { id: string; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/edit-course/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetAllCoursesForAdminQuery,
  useGetSingleCourseWithOutAuthQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
