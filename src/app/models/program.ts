
import { ExerciseSetsRepsCharge } from "c:/Users/belma/Documents/ionins_project/carnet_muscu/src/app/models/exerciseSetsRepsCharge"
export class Program {
  name: string;
  exercises: ExerciseSetsRepsCharge[];

  constructor(name: string, exercises: ExerciseSetsRepsCharge[]) {
    this.name = name;
    this.exercises = exercises;
  }
}