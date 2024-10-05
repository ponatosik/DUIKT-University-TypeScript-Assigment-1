import Component from "./abstract-component.js";
import { TimetableService } from "../services/timetable-service.js";
import { COURSE_TYPES, CourseType } from "../types/course-type.js";
import { Professor } from "../types/professor.js";

export default class professorFormComponent extends Component {
  private submitButtonId: string = `${this.id}-submit`;
  private professorNameFormId: string = `${this.id}-name`;
  private professorDepartmentFormId: string = `${this.id}-department`;

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

  private handleSubmit = () => this.addTeacher();

  public addTeacher(): void {
    const professorNameForm = document.getElementById(this.professorNameFormId) as HTMLInputElement;
    const professorDepartmentForm = document.getElementById(this.professorDepartmentFormId) as HTMLInputElement;

    const id = this.timetableService.getProfessors().length + 1;

    const professor: Professor = {
      id: id,
      name: professorNameForm.value,
      department: professorDepartmentForm.value
    }

    this.timetableService.addProfessor(professor);

    professorNameForm.value = '';
    professorDepartmentForm.value = '';
  }

  public renderToString(): string {
    return `
        <div id=${this.id} class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Add Teacher</h2>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1" for="${this.professorNameFormId}">Name</label>
                    <input type="text" id="${this.professorNameFormId}" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1" for="${this.professorDepartmentFormId}">Department</label>
                    <input type="text" id="${this.professorDepartmentFormId}" class="w-full p-2 border rounded">
                </div>
                <button id="${this.submitButtonId}" type="button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Teacher</button>
            </form>
        </div>
    `;
  }
}
