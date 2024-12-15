import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.page.html',
  styleUrls: ['./update-program.page.scss']
})
export class UpdateProgramPage implements OnInit {
  programForm!: FormGroup;
  programId!: string;
  program!: Program;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService,
    private formBuilder: FormBuilder,
    private location: Location,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.programId = this.route.snapshot.paramMap.get('id')!;
    this.programService.getProgram(this.programId).subscribe((program) => {
      if (program) {
        this.program = program;
        this.programForm = this.formBuilder.group({
          name: [this.program.name, [Validators.required]],
          exercises: this.formBuilder.array(
            this.program.exercises.map((exercise) =>
              this.formBuilder.group({
                id: [exercise.exercise.id],
                nameExercise : [exercise.exercise.name],
                sets: [exercise.sets, [Validators.required]],
                reps: [exercise.reps, [Validators.required]],
                charge: [exercise.charge, [Validators.required]]
              })
            )
          )
        });
      } 
    });
  }

  get exercises(): FormArray {
    return this.programForm.get('exercises') as FormArray;
  }

  onSubmit() {
    if (this.programForm && this.programForm.valid) {
      const updatedProgram: Program = {
        id: this.programId,
        name: this.programForm.get('name')?.value,
        exercises: this.exercises.value.map((exercise: any) => ({
          exercise: this.firestore.doc(`exercises/${exercise.id}`).ref,
          sets: exercise.sets,
          reps: exercise.reps,
          charge: exercise.charge
        }))
      };
  
      this.programService.updateProgram(this.programId, updatedProgram).then(() => {
        this.location.back();
      });
    }
  }
  
}
