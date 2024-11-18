import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../models/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: 'exercise.page.html',
  styleUrls: ['exercise.page.scss']
})
export class ExercisePage implements OnInit {
  exercises: Exercise[] = [];

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
      this.exerciseService.getExercises().subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      });
  }

  // Ouvrir la modale pour ajouter un exercice
  async openAddExerciseModal() {
    const modal = await this.modalController.create({
      component: AddExerciseComponent
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.exercises.push(data.data); // Ajouter l'exercice à la liste
        //this.indexedDbService.addExercises([data.data]); // Sauvegarder l'exercice dans IndexedDB
      }
    });

    return await modal.present();
  }
}
