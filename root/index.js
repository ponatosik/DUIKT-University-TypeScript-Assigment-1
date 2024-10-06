import { TimetableService } from "./services/timetable-service.js";
import TimetableComponent from "./components/timetable-component.js";
import CourseFormComponent from "./components/course-form-component.js";
import ProfessorFormComponent from "./components/professor-form-component.js";
import LessonFormComponent from "./components/lesson-form-component.js";
import ClassroomStatisticsComponent from "./components/classroom-statistics-component.js";
const timetableService = new TimetableService();
const courses = [
    { id: 1, name: 'OOP', type: "Lab" },
    { id: 2, name: 'JAVA', type: "Practice" },
    { id: 3, name: 'JS', type: "Lecture" },
    { id: 4, name: 'Management', type: "Seminar" },
    { id: 5, name: 'C++', type: "Seminar" },
    { id: 6, name: 'Testing', type: "Lecture" }
];
const classrooms = [
    { number: "111", capacity: 30, hasProjector: true },
    { number: "213-K", capacity: 20, hasProjector: false },
    { number: "321", capacity: 10, hasProjector: true },
    { number: "001", capacity: 15, hasProjector: true },
    { number: "113", capacity: 50, hasProjector: true },
    { number: "123-2", capacity: 50, hasProjector: false },
    { number: "Online", capacity: 9999, hasProjector: true }
];
const professors = [
    { id: 1, name: 'John Doe', department: 'IT' },
    { id: 2, name: 'Max Peterson', department: 'IT' },
    { id: 3, name: 'David Smith', department: 'Management' },
    { id: 4, name: 'Will Johnson', department: 'Management' },
    { id: 5, name: 'Matilda Mole', department: 'Engineering' },
    { id: 6, name: 'James Brown', department: 'Engineering' },
    { id: 7, name: 'Alice Shepard', department: 'IT' }
];
const lessons = [
    { timeSlot: '09:45-11:20', dayOfWeek: 'Monday', classroomNumber: '111', professorId: 1, courseId: 1 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Tuesday', classroomNumber: '001', professorId: 2, courseId: 1 },
    { timeSlot: '15:15-16:50', dayOfWeek: 'Wednesday', classroomNumber: '113', professorId: 2, courseId: 1 },
    { timeSlot: '13:30-15:05', dayOfWeek: 'Friday', classroomNumber: 'Online', professorId: 1, courseId: 1 },
    { timeSlot: '13:30-15:05', dayOfWeek: 'Tuesday', classroomNumber: '001', professorId: 3, courseId: 2 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Wednesday', classroomNumber: 'Online', professorId: 3, courseId: 2 },
    { timeSlot: '09:45-11:20', dayOfWeek: 'Wednesday', classroomNumber: '123-2', professorId: 4, courseId: 3 },
    { timeSlot: '15:15-16:50', dayOfWeek: 'Friday', classroomNumber: 'Online', professorId: 4, courseId: 3 },
    { timeSlot: '08:00-09:35', dayOfWeek: 'Tuesday', classroomNumber: '113', professorId: 6, courseId: 4 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Monday', classroomNumber: '213-K', professorId: 6, courseId: 4 },
    { timeSlot: '08:00-09:35', dayOfWeek: 'Thursday', classroomNumber: '111', professorId: 4, courseId: 5 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Tuesday', classroomNumber: '001', professorId: 5, courseId: 5 },
    { timeSlot: '08:00-09:35', dayOfWeek: 'Friday', classroomNumber: 'Online', professorId: 5, courseId: 5 },
    { timeSlot: '08:00-09:35', dayOfWeek: 'Friday', classroomNumber: '213-K', professorId: 7, courseId: 6 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Monday', classroomNumber: '111', professorId: 7, courseId: 6 },
    { timeSlot: '11:45-13:20', dayOfWeek: 'Friday', classroomNumber: '123-2', professorId: 6, courseId: 6 }
];
courses.forEach(course => timetableService.addCourse(course));
classrooms.forEach(classroom => timetableService.addClassroom(classroom));
professors.forEach(professor => timetableService.addProfessor(professor));
lessons.forEach(lesson => timetableService.addLesson(lesson));
const timetableElement = document.querySelector('#timetable-component');
const courseFormElement = document.querySelector('#course-form-component');
const professorFormElement = document.querySelector('#professor-form-component');
const lessonFormElement = document.querySelector('#lesson-form-component');
const classromStatisticsElement = document.querySelector('#classroom-statistics-component');
const components = [
    new TimetableComponent(timetableElement, timetableService),
    new CourseFormComponent(courseFormElement, timetableService),
    new ProfessorFormComponent(professorFormElement, timetableService),
    new LessonFormComponent(lessonFormElement, timetableService),
    new ClassroomStatisticsComponent(classromStatisticsElement, timetableService)
];
components.forEach(component => component.render());
timetableService.onUpdate = () => components.forEach(component => component.update());
