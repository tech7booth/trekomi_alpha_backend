import { Schema, model, InferSchemaType } from "mongoose";

const progressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// One progress record per lesson
progressSchema.index(
  {
    user: 1,
    lesson: 1,
  },
  {
    unique: true,
  }
);

export type Progress = InferSchemaType<typeof progressSchema>;

export const ProgressModel = model(
  "Progress",
  progressSchema
);