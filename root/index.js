import ClassroomStatisticsComponent from './components/classroom-statistics-component.js';
import CourseFormComponent from './components/course-form-component.js';
import LessonFormComponent from './components/lesson-form-component.js';
import ModalComponent from './components/modal-window-component.js';
import ProfessorFormComponent from './components/professor-form-component.js';
import TimetableComponent from './components/timetable-component.js';
import { classrooms, courses, lessons, professors } from './mock-scedule.js';
import { TimetableService } from './services/timetable-service.js';
const timetableService = new TimetableService();
courses.forEach((course) => timetableService.addCourse(course));
classrooms.forEach((classroom) => timetableService.addClassroom(classroom));
professors.forEach((professor) => timetableService.addProfessor(professor));
lessons.forEach((lesson) => timetableService.addLesson(lesson));
const timetableElement = document.querySelector('#timetable-component');
const courseFormElement = document.querySelector('#course-form-component');
const professorFormElement = document.querySelector('#professor-form-component');
const lessonFormElement = document.querySelector('#lesson-form-component');
const statisticsElement = document.querySelector('#classroom-statistics-component');
const modalWindowElement = document.querySelector('#modal-component');
const modalComponent = new ModalComponent(modalWindowElement);
const components = [
    new TimetableComponent(timetableElement, timetableService),
    new CourseFormComponent(courseFormElement, timetableService),
    new ProfessorFormComponent(professorFormElement, timetableService),
    new LessonFormComponent(lessonFormElement, timetableService, modalComponent),
    new ClassroomStatisticsComponent(statisticsElement, timetableService),
    modalComponent
];
components.forEach((component) => component.render());
timetableService.onUpdate = () => components.forEach((component) => component.update());
