import { TimetableService } from '../services/timetable-service.js';
import { Classroom } from '../types/classroom.js';
import Component from './abstract-component.js';

export default class ClassroomFormComponent extends Component {
  constructor(
    htmlElement: HTMLElement,
    private timetableService: TimetableService
  ) {
    super(htmlElement);
  }

  public render(): void {
    this.htmlElement.outerHTML = this.renderToString();
    this.htmlElement = document.getElementById(this.id)!;
  }

  public renderToString(): string {
    const classrooms = this.timetableService.getClassrooms();
    const classroomSections = classrooms
      .map((room) => this.renderClassromStatistic(room))
      .join('\n');

    return `
            <div class="bg-white p-6 rounded-lg shadow" id="${this.id}">
                <h2 class="text-xl font-semibold mb-4">Classroom Utilization</h2>
                <div class="space-y-4">
                    ${classroomSections}
                </div>
            </div>`;
  }

  private renderClassromStatistic(classroom: Classroom): string {
    const utilizetion = this.timetableService.getClassroomUtilization(classroom);
    const unitizationPercent = `${Math.ceil(utilizetion * 100)}%`;

    return `
            <div class="flex items-center">
                <div class="w-24 font-medium">${classroom.number}</div>
                <div class="flex-grow">
                    <div class="h-4 bg-gray-200 rounded-full">
                        <div class="h-4 bg-blue-500 rounded-full" style="width: ${unitizationPercent}"></div>
                    </div>
                </div>
                <div class="w-16 text-right font-medium">${unitizationPercent}</div>
            </div>`;
  }
}
