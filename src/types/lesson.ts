import { DayOfWeek } from "./day-of-week"
import { TimeSlot } from "./time-slot"

export type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
}
