This repository contains the homework assignment for the TypeScript course at [DUIKT University](https://duikt.edu.ua/en/).

## Task 1 (JS to TS)

- Add index.js file with 200 lines of JS code
- Rewrite JS code to simple TS code (without installing TS for now)

## Task 2 (tsconfig)

- Create a "feature/tsconfig" branch and add an HTML/CSS template.
- Write all JavaScript functionality in a .ts file with primitive types
- Link the compiled .js file in the HTML
- Implement features like modals, event listeners (e.g., scroll, click), animations
- Fetch and display data from some json
- Create GitHub Pages from this branch

## Task 3 (custom types)

- Create basic types for timetable objects
  - DayOfWeek
  - TimeSlot
  - CourseType
  - Professor
  - Classroom
  - Course
  - Lesson
  - ScheduleConflict
- Create basic university timetable management system. Implement next functions:
  - addProfessor(professor: Professor): void
  - addLesson(lesson: Lesson): boolean
  - findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[]
  - getProfessorSchedule(professorId: number): Lesson[]
  - validateLesson(lesson: Lesson): ScheduleConflict | null
  - getClassroomUtilization(classroomNumber: string): number
  - getMostPopularCourseType(): CourseType
  - reassignClassroom(lessonId: number, newClassroomNumber: string): boolean
  - cancelLesson(lessonId: number): void

## Task 3 [lab] (installing linter)

- Install and configure Pretier
- Install and configure ESLint
- Install Husky and configure lint-staged

## Task 4 (modules)

- Move code from Task 2 to a new 'feature/modules' branch
- Split .ts code into logical modules in separate folders. Move types to a separate file and folder.
- Connect all modules in main.ts. Import dependent modules/types as needed.

## Task 5 (generics)

- Create types for simple e-commerce system using generics:
  - BaseProduct(id, name, price)
  - Electronic = BaseProduct & ...
  - Clothing = BaseProduct & ...
  - CartItem<T>(product, quantity)
- Create function to manage simple e-commerce system
  - findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined
  - filterByPrice = <T extends BaseProduct>(): T[] => {
  - calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number
- Test implementation

## Task 7 (enums)

- Create enums:
  - StudentStatus: (Active, Academic_Leave, Graduated, Expelled)
  - CourseType: (Mandatory, Optional, Special)
  - Semester: (First, Second)
  - Grade: (Excellent = 5, Good = 4, Satisfactory = 3, Unsatisfactory = 2)
  - Faculty: (Computer_Science, Economics, Law, Engineering)
- Create intefaces:
  - Student {id, fullName, faculty, year, status, enrollmentDate, groupNumber)
  - Course(id, name, type, credits, semester, faculty, maxStudents)
  - Grade {studentId, courseId, grade, date, semester)
- Implement UniversityManagementSystem class with methods:
  - enrollStudent(student: Omit<Student, "id">): Student
  - registerForCourse(studentId: number, courseId: number): void
  - setGrade(studentId: number, courseId: number, grade: Grade): void
  - updateStudentStatus(studentId: number, newStatus: StudentStatus): void
  - getStudentsByFaculty(faculty: Faculty): Student[]
  - getStudentGrades(studentId: number): Grade[]
  - getAvailableCourses(faculty: Faculty, semester: Semester): Course[]
  - calculateAverageGrade(studentId: number): number
- Additionl requirements:
  - Validate course registration (check course size and students faculty)
  - Validate students status
  - Validate weather student is registered for course
  - Method to get top performing students within faculty
