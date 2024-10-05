import { DayOfWeek } from "./day-of-week.js"
import { TimeSlot } from "./time-slot.js"

export type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
}
