export interface IThumbnail {
  public_id: string;
  url: string;
}

export interface IBenefit {
  _id?: string;
  title: string;
}

export interface IPrerequisite {
  _id?: string;
  title: string;
}

export interface ILink {
  _id?: string;
  title: string;
  url: string;
}

export interface IComment {
  _id?: string;
  user: string;
  comment: string;
  commentReplies?: IComment[];
}

export interface IQuestion {
  _id?: string;
  user: string;
  question: string;
  questionReplies: IComment[];
}

export interface IReview {
  _id?: string;
  user: string;
  comment: string;
  rating: number;
  commentReplies?: IComment[];
}

export interface ICourseDataPreview {
  _id: string;
  title: string;
  description: string;
  videoSection: string;
}

export interface ICourseData {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestions: string[];
  questions: IQuestion[];
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail?: IThumbnail;
  tags: string[];
  level: string;
  demoUrl: string;
  benefits: IBenefit[];
  prerequisites: IPrerequisite[];
  reviews: IReview[];
  courseData: ICourseDataPreview[];
  ratings: number;
  purchased: number;
  createdAt: Date;
}

export interface ICourseCard {
  _id: string;
  title: string;
  ratings: number;
  purchased: number;
  price: number;
  estimatedPrice?: number;
  level: string;
  tags: string[];
  thumbnail?: IThumbnail;
}

export interface ICourseAdmin extends Omit<ICourse, "courseData"> {
  courseData: ICourseData[];
}

export interface GetAllCoursesResponse {
  success: boolean;
  courses: ICourse[];
}

export interface GetAllCoursesForAdminResponse {
  success: boolean;
  courses: ICourseAdmin[];
}

export interface GetSingleCourseResponse {
  success: boolean;
  course: ICourse;
}

export interface EditCourseResponse {
  success: boolean;
  course: ICourse;
}

export interface GetCourseByUserResponse {
  success: boolean;
  content: ICourseData[];
}

export interface AddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export interface AddQuestionAnswerData {
  question: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export interface AddReviewData {
  review: string;
  rating: number;
}

export interface AddReplyData {
  reviewId: string;
  comment: string;
  courseId: string;
}

export interface CourseMutationResponse {
  success: boolean;
  message: string;
}
