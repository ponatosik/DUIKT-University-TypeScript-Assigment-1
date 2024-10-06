import { WORKING_DAYS_OF_WEEK } from "../types/day-of-week.js";
import { TIME_SLOTS } from "../types/time-slot.js";
import Component from "./abstract-component.js";
export default class TimetableComponent extends Component {
    timetableService;
    constructor(htmlElement, timetableService) {
        super(htmlElement);
        this.timetableService = timetableService;
    }
    render() {
        this.htmlElement.outerHTML = this.renderToString();
        this.htmlElement = document.getElementById(this.id);
    }
    renderToString() {
        const tableRows = TIME_SLOTS
            .map((time, index) => this.renderTimeRow(time, index))
            .join('');
        return `
            <div class="bg-white p-6 rounded-lg shadow" id=${this.id}>
                <h2 class="text-xl font-semibold mb-4">Weekly Timetable</h2>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr>
                                <th class="border p-2 bg-gray-100">Time</th>
                                ${WORKING_DAYS_OF_WEEK.map(day => `<th class="border p-2 bg-gray-100">${day}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
    `;
    }
    renderTimeRow = (time, index) => {
        const timetable = this.timetableService.getSchedule();
        const cells = WORKING_DAYS_OF_WEEK.map(day => {
            const lessons = timetable.filter(lsn => lsn.timeSlot == time && lsn.dayOfWeek == day);
            return `<td class="border p-2">${this.renderTimeSlot(lessons)}</td>`;
        }).join('');
        return `
            <tr>
                <td class="border p-2 font-medium">${time}</td>
                ${cells}
            </tr>
        `;
    };
    renderTimeSlot = (lessons) => {
        return lessons.map(lesson => {
            const classroom = this.timetableService.getClassrooms().find(cls => cls.number == lesson.classroomNumber) ?? null;
            const professor = this.timetableService.getProfessors().find(prof => prof.id == lesson.professorId) ?? null;
            const course = this.timetableService.getCourses().find(crs => crs.id == lesson.courseId) ?? null;
            return `${course?.name} - (${classroom?.number})<br><span class="text-sm text-gray-500">${professor?.name}</span>`;
        }).join('<hr>');
    };
}
