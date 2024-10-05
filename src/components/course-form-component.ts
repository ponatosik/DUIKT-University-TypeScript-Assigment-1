import Component from "./abstract-component.js";
import { TimetableService } from "../services/timetable-service.js";
import { Course } from "../types/course.js";
import { COURSE_TYPES, CourseType } from "../types/course-type.js";

export default class CourseFormComponent extends Component {
  private submitButtonId: string = `${this.id}-submit`;
  private courseNameFormId: string = `${this.id}-name`;
  private courseTypeFormId: string = `${this.id}-type`;

  constructor(htmlElement: HTMLElement, private timetableService: TimetableService) {
    super(htmlElement);
  }

  public render(): void {
    this.htmlElement.outerHTML = this.renderToString();
    this.htmlElement = document.getElementById(this.id)!;

    const submitButton = document.getElementById(this.submitButtonId);
    submitButton?.removeEventListener('click', this.handleSubmit);
    submitButton?.addEventListener('click', this.handleSubmit);
  }

  private handleSubmit = () => this.addCourse();

  public addCourse(): void {
    const courseNameForm = document.getElementById(this.courseNameFormId) as HTMLInputElement;
    const courseTypeForm = document.getElementById(this.courseTypeFormId) as HTMLInputElement;

    const id = this.timetableService.getCourses().length + 1;

    const course: Course = {
      id: id,
      name: courseNameForm.value,
      type: courseTypeForm.value as CourseType
    }

    this.timetableService.addCourse(course);

    courseNameForm.value = '';
    courseTypeForm.value = 'Lecture';
  }

  public renderToString(): string {
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
                          ${COURSE_TYPES.map(type => `<option>${type}</option>`).join('')}
                        </select>
                </div>

                <button id="${this.submitButtonId}" type="button" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add Course
                </button>
            </form>
        </div>
    `;
  }
}

