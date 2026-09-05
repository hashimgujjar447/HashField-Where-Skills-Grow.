import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
      required: true,
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
