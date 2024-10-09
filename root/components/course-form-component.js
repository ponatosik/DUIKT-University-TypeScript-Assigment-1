import { COURSE_TYPES } from '../types/course-type.js';
import Component from './abstract-component.js';
export default class CourseFormComponent extends Component {
    timetableService;
    submitButtonId = `${this.id}-submit`;
    courseNameFormId = `${this.id}-name`;
    courseTypeFormId = `${this.id}-type`;
    constructor(htmlElement, timetableService) {
        super(htmlElement);
        this.timetableService = timetableService;
    }
    render() {
        this.htmlElement.outerHTML = this.renderToString();
        this.htmlElement = document.getElementById(this.id);
        const submitButton = document.getElementById(this.submitButtonId);
        const handleSubmit = () => this.addCourse();
        submitButton?.removeEventListener('click', handleSubmit);
        submitButton?.addEventListener('click', handleSubmit);
    }
    addCourse() {
        const courseNameForm = document.getElementById(this.courseNameFormId);
        const courseTypeForm = document.getElementById(this.courseTypeFormId);
        const id = this.timetableService.getCourses().length + 1;
        const course = {
            id: id,
            name: courseNameForm.value,
            type: courseTypeForm.value
        };
        this.timetableService.addCourse(course);
    }
    renderToString() {
        return `
            <div id="${this.id}" class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">Add Course</h2>
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1" for="${this.courseNameFormId}">Course Name</label>
                        <input type="text" id="${this.courseNameFormId}" name="courseName" class="w-full p-2 border rounded">
                    </div>
                  <div>
                        <label class="block text-sm font-medium mb-1" for="${this.courseTypeFormId}">Course Type</label>
                            <select id="${this.courseTypeFormId}" class="w-full p-2 border rounded">
                              ${COURSE_TYPES.map((type) => `<option>${type}</option>`).join('')}
                            </select>
                    </div>

                    <button id="${this.submitButtonId}" type="button" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Add Course
                    </button>
                </form>
            </div>`;
    }
}
