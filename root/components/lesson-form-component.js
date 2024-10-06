import Component from "./abstract-component.js";
import { WORKING_DAYS_OF_WEEK } from "../types/day-of-week.js";
import { TIME_SLOTS } from "../types/time-slot.js";
export default class LessonFormComponent extends Component {
    timetableService;
    modal;
    submitButtonId = `${this.id}-submit`;
    lessonCourseFormId = `${this.id}-course`;
    lessonProfessorFormId = `${this.id}-professor`;
    lessonRoomFormId = `${this.id}-room`;
    lessonDayFormId = `${this.id}-day`;
    lessonTimeFormId = `${this.id}-time`;
    constructor(htmlElement, timetableService, modal) {
        super(htmlElement);
        this.timetableService = timetableService;
        this.modal = modal;
    }
    render() {
        this.htmlElement.outerHTML = this.renderToString();
        this.htmlElement = document.getElementById(this.id);
        const submitButton = document.getElementById(this.submitButtonId);
        submitButton?.removeEventListener('click', this.handleSubmit);
        submitButton?.addEventListener('click', this.handleSubmit);
    }
    handleSubmit = () => this.addLesson();
    addLesson() {
        const lessonCourseId = document.getElementById(this.lessonCourseFormId);
        const lessonProfessorId = document.getElementById(this.lessonProfessorFormId);
        const lessonRoomId = document.getElementById(this.lessonRoomFormId);
        const lessonDay = document.getElementById(this.lessonDayFormId);
        const lessonTime = document.getElementById(this.lessonTimeFormId);
        const lesson = {
            courseId: parseInt(lessonCourseId.value),
            professorId: parseInt(lessonProfessorId.value),
            classroomNumber: lessonRoomId.value,
            dayOfWeek: lessonDay.value,
            timeSlot: lessonTime.value,
        };
        const lessonConflict = this.timetableService.validateLesson(lesson);
        if (lessonConflict) {
            const professor = this.timetableService.getProfessors().find(prof => prof.id == lesson.professorId);
            const meessage = `
        ${lessonConflict.type} for lesson
        ${lesson.dayOfWeek} (${lesson.timeSlot}),
        professor: ${professor?.name},
        classroom: ${lesson.classroomNumber}
      `;
            this.modal.showMessage(meessage);
            return;
        }
        this.timetableService.addLesson(lesson);
        lessonCourseId.value = '';
        lessonProfessorId.value = '';
        lessonRoomId.value = '';
        lessonDay.value = '';
        lessonTime.value = '';
    }
    renderToString() {
        return `
            <div class="bg-white p-6 rounded-lg shadow" id="${this.id}">
                <h2 class="text-xl font-semibold mb-4">Add Lesson</h2>
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1" for="${this.lessonCourseFormId}">Course</label>
                        <select id="${this.lessonCourseFormId}" class="w-full p-2 border rounded">
                          ${this.timetableService.getCourses()
            .map(course => `<option value="${course.id}">${course.name}</option>`)
            .join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="${this.lessonRoomFormId}">Classroom</label>
                        <select id="${this.lessonRoomFormId}" class="w-full p-2 border rounded">
                          ${this.timetableService.getClassrooms()
            .map(classroom => `<option>${classroom.number}</option>`)
            .join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="${this.lessonProfessorFormId}">Teacher</label>
                        <select id="${this.lessonProfessorFormId}" class="w-full p-2 border rounded">
                          ${this.timetableService.getProfessors()
            .map(professor => `<option value="${professor.id}">${professor.name}</option>`)
            .join('')}
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1" for="${this.lessonDayFormId}">Day</label>
                            <select id="${this.lessonDayFormId}" class="w-full p-2 border rounded">
                                ${WORKING_DAYS_OF_WEEK.map(day => `<option>${day}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="${this.lessonTimeFormId}">Time</label>
                            <select id="${this.lessonTimeFormId}" class="w-full p-2 border rounded">
                                ${TIME_SLOTS.map(time => `<option>${time}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button id="${this.submitButtonId}" type="button" class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Add Lesson</button>
                </form>
            </div>
        </div>
    `;
    }
}
