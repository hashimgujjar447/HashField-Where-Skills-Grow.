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

    getCourseContent: builder.query({
      query: (courseId: string) => `/get-course-content/${courseId}`,
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

    editCourse: builder.mutation<EditCourseResponse, { id: string; data: unknown }>({
      query: ({ id, data }) => ({
        url: `/edit-course/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    addQuestion: builder.mutation<
      { success: boolean; message: string },
      { question: string; courseId: string; contentId: string }
    >({
      query: (body) => ({
        url: "/add-question",
        method: "POST",
        body,
      }),
    }),

    addQuestionAnswer: builder.mutation<
      { success: boolean; message: string },
      { question: string; courseId: string; contentId: string; questionId: string }
    >({
      query: (body) => ({
        url: "/add-question-answer",
        method: "POST",
        body,
      }),
    }),

    addReview: builder.mutation<
      { success: boolean; message: string },
      { courseId: string; review: string; rating: number }
    >({
      query: ({ courseId, ...body }) => ({
        url: `/add-review/${courseId}`,
        method: "POST",
        body,
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
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useAddQuestionAnswerMutation,
  useAddReviewMutation,
} = courseApi;
