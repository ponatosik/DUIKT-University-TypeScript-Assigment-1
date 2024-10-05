import { CourseType } from "./course-type.js"

export type Course = {
  id: number;
  name: string;
  type: CourseType;
}
