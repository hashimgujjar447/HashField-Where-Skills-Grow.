import mongoose, { Document } from "mongoose";

interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  comment: string;
  commentReplies?: IComment[];
}

interface IQuestion extends Document {
  user: mongoose.Types.ObjectId;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
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

interface ICourse extends Document {
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
  demoUrl: string;
  benefits: {
    title: string;
  }[];
  prerequisites: {
    title: string;
  }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings: number;
  purchased: number;
}

const reviewSchema = new mongoose.Schema<IReview>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  commentReplies: {
    type: [],
    default: [],
  },
});

const commentSchema = new mongoose.Schema<IComment>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentReplies: {
    type: [],
    default: [],
  },
});

const questionSchema = new mongoose.Schema<IQuestion>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  questionReplies: {
    type: [],
    default: [],
  },
});

const linkSchema = new mongoose.Schema<ILink>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const courseDataSchema = new mongoose.Schema<ICourseData>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  videoSection: {
    type: String,
    required: true,
  },
  videoLength: {
    type: Number,
    required: true,
  },
  videoPlayer: {
    type: String,
    required: true,
  },
  links: {
    type: [linkSchema],
    default: [],
  },
  suggestions: {
    type: [String],
    default: [],
  },
  questions: {
    type: [questionSchema],
    default: [],
  },
});

const courseSchema = new mongoose.Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    estimatedPrice: {
      type: Number,
      min: 0,
    },

    thumbnail: {
      public_id: String,
      url: String,
    },

    tags: {
      type: [String],
      default: [],
    },

    level: {
      type: String,
      required: true,
    },

    demoUrl: {
      type: String,
      required: true,
    },

    benefits: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    prerequisites: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    courseData: {
      type: [courseDataSchema],
      default: [],
    },

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    purchased: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
