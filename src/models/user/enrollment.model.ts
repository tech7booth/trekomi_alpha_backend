import { Schema, model, InferSchemaType } from "mongoose";

const enrollmentSchema = new Schema(
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

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate enrollments
enrollmentSchema.index(
  { user: 1, course: 1 },
  { unique: true }
);

export type Enrollment = InferSchemaType<typeof enrollmentSchema>;

export const EnrollmentModel = model(
  "Enrollment",
  enrollmentSchema
);