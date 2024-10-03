import { Lesson } from "./lesson"

export type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetatil: Lesson;
}
