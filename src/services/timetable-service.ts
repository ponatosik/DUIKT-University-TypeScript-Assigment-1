import { Classroom } from "../types/classroom"
import { Course } from "../types/course"
import { CourseType } from "../types/course-type"
import { DayOfWeek, NUMBER_OF_DAYS } from "../types/day-of-week"
import { Lesson } from "../types/lesson"
import { Professor } from "../types/professor"
import { ScheduleConflict } from "../types/schedule-conflict"
import { NUMBER_OF_TIMESLOTS, TimeSlot } from "../types/time-slot"

export class TimetableService {
  private professors: Professor[] = [];
  private classrooms: Classroom[] = [];
  private courses: Course[] = [];
  private schedule: Lesson[] = [];

  public addProfessor(professor: Professor): void {
    this.professors.push(professor);
  }

  public addLesson(lesson: Lesson): void {
    if (this.validateLesson(lesson) == null) {
      this.schedule.push(lesson);
    } else {
      throw new Error("Lesson conflict");
    }
  }

  public findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    return this.classrooms
      .filter(classroom => this.isClassroomAvailable(timeSlot, dayOfWeek, classroom))
      .map(classroom => classroom.number);
  }

  public isClassroomAvailable(timeSlot: TimeSlot, dayOfWeek: DayOfWeek, classroom: Classroom): boolean {
    return !this.schedule
      .find(lesson =>
        lesson.timeSlot == timeSlot &&
        lesson.dayOfWeek == dayOfWeek &&
        lesson.classroomNumber == classroom.number);
  }

  public getProfessorSchedule(professorId: number): Lesson[] {
    return this.schedule
      .filter(lesson => lesson.professorId == professorId);
  }

  public validateLesson(lesson: Lesson): ScheduleConflict | null {
    const lessonsInSameTime = this.schedule
      .filter(lsn => lsn.timeSlot == lesson.timeSlot && lsn.dayOfWeek == lesson.dayOfWeek);

    if (lessonsInSameTime.find(lsn => lsn.courseId == lesson.courseId)) {
      return { type: "ClassroomConflict", lessonDetatil: lesson };
    }
    if (lessonsInSameTime.find(lsn => lsn.professorId == lesson.professorId)) {
      return { type: "ProfessorConflict", lessonDetatil: lesson };
    }
    return null;
  }

  public getClassroomUtilization(classroom: Classroom): number {
    const numberOfLessons = this.schedule
      .filter(lesson => lesson.classroomNumber == classroom.number)
      .length;

    const maximumNumberOfLessons = NUMBER_OF_TIMESLOTS * NUMBER_OF_DAYS;
    return numberOfLessons / maximumNumberOfLessons;
  }

  public getMostPopularCourseType(): CourseType {
    const groupedCourses = new Map<CourseType, number>();
    this.courses.forEach(course =>
      groupedCourses.set(course.type, (groupedCourses.get(course.type) || 0) + 1));

    const maxNumberOfLesson = Math.max(...Array.from(groupedCourses.values()));
    let mostPopularCourseType!: CourseType;
    for (const [courseType, numberOfLessons] of groupedCourses.entries()) {
      if (numberOfLessons == maxNumberOfLesson) {
        mostPopularCourseType = courseType;
        break;
      }
    }

    return mostPopularCourseType;
  }

  public reassignClassroom(lesson: Lesson, newClassroomNumber: string): boolean {
    const previouseClassroom = lesson.classroomNumber;
    lesson.classroomNumber = newClassroomNumber;

    if (!this.validateLesson(lesson) == null) {
      lesson.classroomNumber = previouseClassroom;
      return false;
    }

    return true;
  }

  public cancelLesson(lesson: Lesson): void {
    this.schedule = this.schedule.filter(lsn => lsn !== lesson);
  }
}
