import mongoose, { Document, Schema } from "mongoose";

interface IFaqs extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface IBannerImage extends Document {
  public_id: string;
  url: string;
}

interface ILayout extends Document {
  type: string;
  faqs: IFaqs[];
  categories: Category[];
  banner: {
    image: IBannerImage;
    title: string;
    subtitle: string;
  };
}

const faqsSchema = new Schema<IFaqs>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const categorySchema = new Schema<Category>({
  title: {
    type: String,
    required: true,
  },
});

const bannerImageSchema = new Schema<IBannerImage>({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const layoutSchema = new Schema<ILayout>(
  {
    type: {
      type: String,
      required: true,
    },
    faqs: {
      type: [faqsSchema],
      default: [],
    },
    categories: {
      type: [categorySchema],
      default: [],
    },
    banner: {
      image: bannerImageSchema,
      title: {
        type: String,
      },
      subtitle: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

export const Layout = mongoose.model<ILayout>("Layout", layoutSchema);
