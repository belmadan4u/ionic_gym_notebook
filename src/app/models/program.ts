
import { ExerciseSetsRepsCharge } from "./exerciseSetsRepsCharge"
export class Program {
  id : string;
  name: string;
  exercises: ExerciseSetsRepsCharge[];

  constructor(id: string, name: string, exercises: ExerciseSetsRepsCharge[]) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }
}