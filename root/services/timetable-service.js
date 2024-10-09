import { NUMBER_OF_WORKING_DAYS } from '../types/day-of-week.js';
import { NUMBER_OF_TIMESLOTS } from '../types/time-slot.js';
export class TimetableService {
    professors = [];
    classrooms = [];
    courses = [];
    schedule = [];
    findAvailableClassrooms(timeSlot, dayOfWeek) {
        return this.classrooms
            .filter((classroom) => this.isClassroomAvailable(timeSlot, dayOfWeek, classroom))
            .map((classroom) => classroom.number);
    }
    isClassroomAvailable(timeSlot, dayOfWeek, classroom) {
        return !this.schedule.find((lesson) => lesson.timeSlot == timeSlot &&
            lesson.dayOfWeek == dayOfWeek &&
            lesson.classroomNumber == classroom.number);
    }
    getProfessorSchedule(professorId) {
        return this.schedule.filter((lesson) => lesson.professorId == professorId);
    }
    validateLesson(lesson) {
        const lessonsInSameTime = this.schedule.filter((lsn) => lsn.timeSlot == lesson.timeSlot && lsn.dayOfWeek == lesson.dayOfWeek);
        if (lessonsInSameTime.find((lsn) => lsn.classroomNumber == lesson.classroomNumber)) {
            return { type: 'ClassroomConflict', lessonDetatil: lesson };
        }
        if (lessonsInSameTime.find((lsn) => lsn.professorId == lesson.professorId)) {
            return { type: 'ProfessorConflict', lessonDetatil: lesson };
        }
        return null;
    }
    getClassroomUtilization(classroom) {
        const numberOfLessons = this.schedule.filter((lesson) => lesson.classroomNumber == classroom.number).length;
        const maximumNumberOfLessons = NUMBER_OF_TIMESLOTS * NUMBER_OF_WORKING_DAYS;
        return numberOfLessons / maximumNumberOfLessons;
    }
    getMostPopularCourseType() {
        const groupedCourses = new Map();
        this.courses.forEach((course) => groupedCourses.set(course.type, (groupedCourses.get(course.type) || 0) + 1));
        const maxNumberOfLesson = Math.max(...Array.from(groupedCourses.values()));
        let mostPopularCourseType;
        for (const [courseType, numberOfLessons] of groupedCourses.entries()) {
            if (numberOfLessons == maxNumberOfLesson) {
                mostPopularCourseType = courseType;
                break;
            }
        }
        return mostPopularCourseType;
    }
    reassignClassroom(lesson, newClassroomNumber) {
        const previouseClassroom = lesson.classroomNumber;
        lesson.classroomNumber = newClassroomNumber;
        if (!this.validateLesson(lesson) == null) {
            lesson.classroomNumber = previouseClassroom;
            return false;
        }
        return true;
    }
    cancelLesson(lesson) {
        this.schedule = this.schedule.filter((lsn) => lsn !== lesson);
        if (this.onUpdate != null)
            this.onUpdate();
    }
    getSchedule() {
        return this.schedule;
    }
    getClassrooms() {
        return this.classrooms;
    }
    getCourses() {
        return this.courses;
    }
    getProfessors() {
        return this.professors;
    }
    // NOTE: This approach is horible, not scalible and causes redundant updates
    // But I do it to get updates working with vanilla TS -_-
    // Beeter options (requiring libraries or frameworks):
    // Event emitters, RxJx, Signals, Runes, or whatever your framework provides...
    onUpdate = null;
    addProfessor(professor) {
        this.professors.push(professor);
        if (this.onUpdate != null)
            this.onUpdate();
    }
    addClassroom(classroom) {
        this.classrooms.push(classroom);
        if (this.onUpdate != null)
            this.onUpdate();
    }
    addCourse(course) {
        this.courses.push(course);
        if (this.onUpdate != null)
            this.onUpdate();
    }
    addLesson(lesson) {
        if (this.validateLesson(lesson) == null) {
            this.schedule.push(lesson);
            if (this.onUpdate != null)
                this.onUpdate();
        }
        else {
            throw new Error('Lesson conflict');
        }
    }
}
