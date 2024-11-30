enum StudentStatus {
  Active,
  Academic_Leave,
  Graduated,
  Expelle
}

enum CourseType {
  Mandatory,
  Optional,
  Specia
}

enum Semester {
  First,
  Secon
}

// Changed enum name because of the conflict with Grade interface
enum GradeMark {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2
}

enum Faculty {
  Computer_Science,
  Economics,
  Law,
  Engineerin
}

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

// Interface to store information about student's courses (many to many relationship)
interface CourseRegistration {
  studentId: number;
  courseId: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade: GradeMark;
  date: Date;
  semester: Semester;
}

// Type alias for better readability
type OmitId<T> = Omit<T, 'id'>;

class UniversityManagementSystem {
  private enrolledStudents: Student[] = [];
  private registeredCourses: Course[] = [];
  private studentGrades: Grade[] = [];
  private courseRegistrations: CourseRegistration[] = [];

  // Registers student in system
  public enrollStudent(student: OmitId<Student>): Student {
    const studentId = this.enrolledStudents.length + 1;
    const registeredStudent: Student = { ...student, id: studentId };

    this.enrolledStudents.push(registeredStudent);
    return registeredStudent;
  }

  // Registers course in system
  public registerCourse(course: OmitId<Course>): Course {
    const courseId = this.registeredCourses.length + 1;
    const registeredCourse: Course = { ...course, id: courseId };

    this.registeredCourses.push(registeredCourse);
    return registeredCourse;
  }

  // Adds student to a course
  public registerForCourse(studentId: number, courseId: number): void {
    const course = this.findCourseById(courseId);
    const student = this.findStudentById(studentId);

    if (!this.isCourseAvailable(course.id))
      throw new Error(`Course with id ${courseId} is not available`);
    if (course.faculty != student.faculty)
      throw new Error(
        `Student with id ${studentId} is not from faculty ${Faculty[course.faculty]}`
      );

    const courseRegistration: CourseRegistration = {
      courseId: course.id,
      studentId: student.id
    };
    this.courseRegistrations.push(courseRegistration);
  }

  // Sets student's grade for a course
  public setGrade(studentId: number, courseId: number, gradeMark: GradeMark): void {
    const course = this.findCourseById(courseId);
    const student = this.findStudentById(studentId);

    this.assertStudentHasCourse(course, student);
    if (this.studentHasGrade(student, course))
      throw new Error(
        `Student with id ${studentId} already has a grade for course with id ${courseId} for ${Semester[course.semester]} semester`
      );

    const grade: Grade = {
      courseId: course.id,
      studentId: student.id,
      grade: gradeMark,
      semester: course.semester,
      date: new Date() // Date could also be passed as an argument
    };
    this.studentGrades.push(grade);
  }

  // Updates student's status
  public updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.findStudentById(studentId);
    const averageGrade = this.calculateAverageGrade(studentId);

    if (student.status == StudentStatus.Graduated)
      throw new Error(`Student with id ${studentId} is already graduated`);

    if (newStatus == StudentStatus.Graduated && averageGrade <= 2)
      throw new Error(`Average grade for student with id ${studentId} is too low to graduate`);

    const finishedCourses = this.studentGrades.filter((grade) => grade.studentId == student.id);
    const registeredCourses = this.courseRegistrations.filter((reg) => reg.studentId == student.id);
    if (finishedCourses.length > registeredCourses.length)
      throw new Error(`Student with id ${studentId} has unfinished courses`);

    student.status = newStatus;
  }

  // Returns list of enrolled students by faculty
  public getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.enrolledStudents.filter((student) => student.faculty == faculty);
  }

  // Returns list of student's grades
  public getStudentGrades(studentId: number): Grade[] {
    const student = this.findStudentById(studentId);
    return this.studentGrades.filter((grade) => grade.studentId == student.id);
  }

  // Returns list of courses available for specific faculty and semester
  public getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.registeredCourses.filter(
      (course) =>
        course.faculty == faculty &&
        course.semester == semester &&
        this.isCourseAvailable(course.id)
    );
  }

  // Calculates student's average grade
  public calculateAverageGrade(studentId: number): number {
    const student = this.findStudentById(studentId);
    const grades = this.studentGrades.filter((grade) => grade.studentId == student.id);
    return grades.reduce((acc, grade) => acc + grade.grade, 0) / grades.length;
  }

  // Returns whether course has available seats
  public isCourseAvailable(courseId: number): boolean {
    const course = this.findCourseById(courseId);
    const registeredStudents = this.courseRegistrations.filter((reg) => reg.courseId == courseId);
    return registeredStudents.length < course.maxStudents;
  }

  // Returns list of students with average grade higher than a given value
  public getTopPerformers(
    faculty: Faculty,
    minimalAverageGrade: number = GradeMark.Good
  ): Student[] {
    const students = this.getStudentsByFaculty(faculty);
    return students.filter(
      (student) => this.calculateAverageGrade(student.id) >= minimalAverageGrade
    );
  }

  // Private helper methods with assertions to keep code clean and DRY

  private findStudentById(id: number): Student {
    const student = this.enrolledStudents.find((student) => student.id == id);
    if (student == null) throw new Error(`Student with id ${id} not found`);
    return student;
  }

  private findCourseById(id: number): Course {
    const course = this.registeredCourses.find((course) => course.id == id);
    if (course == null) throw new Error(`Course with id ${id} not found`);
    return course;
  }

  private assertStudentHasCourse(course: Course, student: Student): void {
    const courseRegistration = this.courseRegistrations.find(
      (reg) => reg.courseId == course.id && reg.studentId == student.id
    );
    if (courseRegistration != null) return;

    throw new Error(
      `Student with id ${student.id} is not registered for course with id ${course.id}`
    );
  }

  private studentHasGrade(student: Student, course: Course): boolean {
    const grade = this.studentGrades.find(
      (grade) => grade.studentId == student.id && grade.courseId == course.id
    );
    return grade != null;
  }
}
