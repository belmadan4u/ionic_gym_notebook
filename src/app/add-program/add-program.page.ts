import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProgramService } from '../services/program.service';
import { Program } from '../models/program'
import { ExerciseSetsRepsCharge } from '../models/exerciseSetsRepsCharge';
import { Exercise } from '../models/exercise';
import { NavController } from '@ionic/angular';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.page.html',
  styleUrls: ['./add-program.page.scss'],
})
export class AddProgramPage implements OnInit {
  programForm: FormGroup;
  availableExercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private exerciseService: ExerciseService,
    private navCtrl: NavController
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      exercises: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addExercise(); // Add an initial exercise form group
    this.loadExercises();
  }

  get exercises(): FormArray {
    return this.programForm.get('exercises') as FormArray;
  }
  loadExercises() {
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.availableExercises = exercises;
    });
  }
  addExercise() {
    const exerciseGroup = this.fb.group({
      exerciseName: ['test', Validators.required],
      sets: [4, Validators.required],
      reps: [10, Validators.required],
      charge: [0, Validators.required],
    });
    this.exercises.push(exerciseGroup);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  onSubmit() {
    if (this.programForm.valid) {
      const formValue = this.programForm.value;
      const exercises = formValue.exercises.map((ex: any) => {
        const exercise = new Exercise(0, ex.exerciseName, [], '', '');
        return new ExerciseSetsRepsCharge(exercise, ex.sets, ex.reps, ex.charge);
      });
      const newProgram = new Program(formValue.name, exercises);

      this.programService.addProgram(newProgram).then(() => {
        console.log('Program added successfully');
        this.navCtrl.back(); // Navigate back after adding the program
      });
    }
  }

  
}