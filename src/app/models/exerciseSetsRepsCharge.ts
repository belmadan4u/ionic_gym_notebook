import { Exercise } from './exercise'

export class ExerciseSetsRepsCharge {
  exercise: Exercise;
  sets: number;
  reps: number;
  charge: number;

  constructor(exercise: Exercise, sets: number, reps: number, charge: number) {
    this.exercise = exercise;
    this.sets = sets;
    this.reps = reps;
    this.charge = charge;
  }
}