import { NUMBER_OF_DAYS } from "../types/day-of-week";
import { NUMBER_OF_TIMESLOTS } from "../types/time-slot";
export class TimetableService {
    professors = [];
    classrooms = [];
    courses = [];
    schedule = [];
    addProfessor(professor) {
        this.professors.push(professor);
    }
    addLesson(lesson) {
        if (this.validateLesson(lesson) == null) {
            this.schedule.push(lesson);
        }
        else {
            throw new Error("Lesson conflict");
        }
    }
    findAvailableClassrooms(timeSlot, dayOfWeek) {
        return this.classrooms
            .filter(classroom => this.isClassroomAvailable(timeSlot, dayOfWeek, classroom))
            .map(classroom => classroom.number);
    }
    isClassroomAvailable(timeSlot, dayOfWeek, classroom) {
        return !this.schedule
            .find(lesson => lesson.timeSlot == timeSlot &&
            lesson.dayOfWeek == dayOfWeek &&
            lesson.classroomNumber == classroom.number);
    }
    getProfessorSchedule(professorId) {
        return this.schedule
            .filter(lesson => lesson.professorId == professorId);
    }
    validateLesson(lesson) {
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
    getClassroomUtilization(classroom) {
        const numberOfLessons = this.schedule
            .filter(lesson => lesson.classroomNumber == classroom.number)
            .length;
        const maximumNumberOfLessons = NUMBER_OF_TIMESLOTS * NUMBER_OF_DAYS;
        return numberOfLessons / maximumNumberOfLessons;
    }
    getMostPopularCourseType() {
        const groupedCourses = new Map();
        this.courses.forEach(course => groupedCourses.set(course.type, (groupedCourses.get(course.type) || 0) + 1));
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
        this.schedule = this.schedule.filter(lsn => lsn !== lesson);
    }
}
