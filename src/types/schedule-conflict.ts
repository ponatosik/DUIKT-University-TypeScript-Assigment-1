import { Lesson } from "./lesson.js"

export type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetatil: Lesson;
}
