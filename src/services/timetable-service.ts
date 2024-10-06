import { Classroom } from "../types/classroom.js"
import { Course } from "../types/course.js"
import { CourseType } from "../types/course-type.js"
import { DayOfWeek, NUMBER_OF_WORKING_DAYS } from "../types/day-of-week.js"
import { Lesson } from "../types/lesson.js"
import { Professor } from "../types/professor.js"
import { ScheduleConflict } from "../types/schedule-conflict.js"
import { NUMBER_OF_TIMESLOTS, TimeSlot } from "../types/time-slot.js"

export class TimetableService {
  private professors: Professor[] = [];
  private classrooms: Classroom[] = [];
  private courses: Course[] = [];
  private schedule: Lesson[] = [];

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

    const maximumNumberOfLessons = NUMBER_OF_TIMESLOTS * NUMBER_OF_WORKING_DAYS;
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
    if (this.onUpdate != null) this.onUpdate();
  }


  public getSchedule(): ReadonlyArray<Lesson> { return this.schedule; }
  public getClassrooms(): ReadonlyArray<Classroom> { return this.classrooms; }
  public getCourses(): ReadonlyArray<Course> { return this.courses; }
  public getProfessors(): ReadonlyArray<Professor> { return this.professors; }


  // NOTE: This approach is horible, not scalible and causes redundant updates
  // But I do it to get updates working with vanilla TS -_-
  // Beeter options (requiring libraries or frameworks):
  // Event emitters, RxJx, Signals, Runes, or whatever your framework provides...
  public onUpdate: (() => void) | null = null;

  public addProfessor(professor: Professor): void {
    this.professors.push(professor);
    if (this.onUpdate != null) this.onUpdate();
  }

  public addClassroom(classroom: Classroom): void {
    this.classrooms.push(classroom);
    if (this.onUpdate != null) this.onUpdate();
  }

  public addCourse(course: Course): void {
    this.courses.push(course);
    if (this.onUpdate != null) this.onUpdate();
  }

  public addLesson(lesson: Lesson): void {
    if (this.validateLesson(lesson) == null) {
      this.schedule.push(lesson);
      if (this.onUpdate != null) this.onUpdate();
    } else {
      throw new Error("Lesson conflict");
    }
  }
}
