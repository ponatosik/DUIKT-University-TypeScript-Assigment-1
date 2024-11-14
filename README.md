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
  - `BaseProduct(id, name, price)`
  - `Electronic = BaseProduct & ...`
  - `Clothing = BaseProduct & ...`
  - `CartItem<T>(product, quantity)`
- Create function to manage simple e-commerce system
  - `findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined`
  - `filterByPrice = <T extends BaseProduct>(): T[] => {`
  - `calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number`
- Test implementation

## Task 5 [lab] (advanced types)

- Create basic types for CMS system
  - `interface BaseContent (id, createdA, updatedAt, publishedAt, status)`
  - `interface Article extends BaseContent`
  - `interface Product extends BaseContent`
  - `type ContentOperations<T extends BaseContent>`
- Create access management system
  - `interface Article extends BaseContent`
  - `type Role`
  - `type Permission`
  - `type AccessControl`
- Create validation sysyem
  - `type Validator<T>`
  - `type ValidationResult`
  - other validators and composite validator...
- Create version controll system
  - `type Versioned<T extends BaseContent>`
