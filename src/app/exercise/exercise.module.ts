import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExercisePage } from './exercise.page';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';

import { ExercisePageRoutingModule } from './exercise-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExercisePageRoutingModule
  ],
  declarations: [ExercisePage, AddExerciseComponent]
})
export class ExercisePageModule {}
