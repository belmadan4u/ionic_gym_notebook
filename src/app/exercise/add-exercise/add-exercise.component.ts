import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {
  newExercise: any = { name: '', muscles: '', description: '', image: '' };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('AddExerciseComponent loaded');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  submitExercise() {
    console.log('Exercice ajouté :', this.newExercise);
/*
    // Ajouter l'exercice à IndexedDB
    this.indexedDbService.addExercises([this.newExercise])
      .then(() => {
        console.log('Exercice ajouté dans IndexedDB');
        this.modalController.dismiss(this.newExercise); // Fermer la modale et renvoyer l'exercice
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'exercice :', error);
      });
  */}
}
