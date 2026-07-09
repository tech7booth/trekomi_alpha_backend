import { Schema, model, InferSchemaType } from "mongoose";

const sectionSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type Section = InferSchemaType<typeof sectionSchema>;

export const SectionModel = model("Section", sectionSchema);