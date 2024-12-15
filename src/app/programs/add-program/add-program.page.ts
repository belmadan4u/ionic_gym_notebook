import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program'
import { ExerciseSetsRepsCharge } from '../../models/exerciseSetsRepsCharge';
import { Exercise } from '../../models/exercise';
import { Location } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.page.html',
  styleUrls: ['./add-program.page.scss'],
})
export class AddProgramPage implements OnInit {
  programForm: FormGroup;
  availableExercises: Exercise[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private exerciseService: ExerciseService,
    private location: Location,
    private firestore: AngularFirestore
  ) {
    this.programForm = this.formBuilder.group({
      name: ['', Validators.required],
      exercises: this.formBuilder.array([]), 
    });
  }

  ngOnInit() {
    this.addExercise();
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
    const exerciseGroup = this.formBuilder.group({
      exerciseId: ['', Validators.required],
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
      console.log(formValue)
      const exercises = formValue.exercises.map((ex: any) => ({
        exercise: this.firestore.doc(`exercises/${ex.exerciseId}`).ref,
        sets: ex.sets,
        reps: ex.reps,
        charge: ex.charge,
      }));
      console.log(exercises)

      const programId = this.firestore.createId();
      const newProgram = {
        id: programId,
        name: formValue.name,
        exercises, 
      };
      console.log(newProgram)

      this.programService.addProgram(newProgram).then(() => {
        console.log('Program added successfully');
        this.location.back(); 
      }).catch((error) => {
        console.error('Error adding program:', error);
      });
    }
  }
  

  
}