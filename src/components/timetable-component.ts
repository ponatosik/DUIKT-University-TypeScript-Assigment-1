import { TimetableService } from "../services/timetable-service.js";
import { DAYS_OF_WEEK } from "../types/day-of-week.js";
import { Lesson } from "../types/lesson.js";
import { TIME_SLOTS } from "../types/time-slot.js";
import Component from "./abstract-component.js";

export default class TimetableComponent extends Component {
  constructor(htmlElement: HTMLElement, private timetableService: TimetableService) {
    super(htmlElement);
  }

  public render(): void {
    this.htmlElement.outerHTML = this.renderToString();
    this.htmlElement = document.getElementById(this.id)!;
  }

  public renderToString(): string {
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
                                ${DAYS_OF_WEEK.map(day => `<th class="border p-2 bg-gray-100">${day}</th>`).join('')}
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

  private renderTimeRow = (time: string, index: number): string => {
    const timetable = this.timetableService.getSchedule();
    const cells = DAYS_OF_WEEK.map(day => {
      const lesson = timetable.find(lsn => lsn.timeSlot == time && lsn.dayOfWeek == day) ?? null;
      return `<td class="border p-2">${this.renderLesson(lesson)}</td>`;
    }).join('');

    return `
            <tr>
                <td class="border p-2 font-medium">${time}</td>
                ${cells}
            </tr>
        `;
  };


  private renderLesson = (lesson: Lesson | null): string => {
    if (!lesson) return '';

    const classroom = this.timetableService.getClassrooms().find(cls => cls.number == lesson.classroomNumber) ?? null;
    const professor = this.timetableService.getProfessors().find(prof => prof.id == lesson.professorId) ?? null;
    const course = this.timetableService.getCourses().find(crs => crs.id == lesson.courseId) ?? null;

    return `${course?.name} - (${classroom?.number})<br><span class="text-sm text-gray-500">${professor?.name}</span>`;
  };

}
