import { Schema, model, InferSchemaType } from "mongoose";

const lessonSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    videoUrl: {
      type: String,
      required: true,
    },

    pdfUrl: String,

    duration: Number,

    order: {
      type: Number,
      required: true,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type Lesson = InferSchemaType<typeof lessonSchema>;

export const LessonModel = model("Lesson", lessonSchema);