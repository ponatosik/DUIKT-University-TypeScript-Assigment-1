import Component from "./abstract-component.js";
export default class professorFormComponent extends Component {
    timetableService;
    submitButtonId = `${this.id}-submit`;
    professorNameFormId = `${this.id}-name`;
    professorDepartmentFormId = `${this.id}-department`;
    constructor(htmlElement, timetableService) {
        super(htmlElement);
        this.timetableService = timetableService;
    }
    render() {
        this.htmlElement.outerHTML = this.renderToString();
        this.htmlElement = document.getElementById(this.id);
        const submitButton = document.getElementById(this.submitButtonId);
        const handleSubmit = () => this.addTeacher();
        submitButton?.removeEventListener('click', handleSubmit);
        submitButton?.addEventListener('click', handleSubmit);
    }
    addTeacher() {
        const professorNameForm = document.getElementById(this.professorNameFormId);
        const professorDepartmentForm = document.getElementById(this.professorDepartmentFormId);
        const id = this.timetableService.getProfessors().length + 1;
        const professor = {
            id: id,
            name: professorNameForm.value,
            department: professorDepartmentForm.value
        };
        this.timetableService.addProfessor(professor);
    }
    renderToString() {
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
        </div>`;
    }
}
