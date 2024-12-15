import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private firestore: AngularFirestore) {}

  getExercises(): Observable<Exercise[]> {
    return this.firestore.collection<Exercise>('exercises').snapshotChanges().pipe(
      map((actions: any[]) =>
        actions.map(a => {
          const data = a.payload.doc.data() as Exercise;
          const id = a.payload.doc.id;
          return { ...data, id };
        })
      )
    );
  }
  

  getExercise(id: number){
    return this.firestore.doc<Exercise>('exercises/' + id).valueChanges();
  }

  addExercise(exercise: Exercise): Promise<void> {
    const id = this.firestore.createId(); // Génère un ID unique
    return this.firestore
      .doc(`exercises/${id}`)
      .set({ ...exercise, id }) // Ajoute l'ID généré aux données
      .then(() => console.log('Exercise added!'))
      .catch((error) => console.error('Error adding exercise:', error));
  }

  updateExercise(id: string, updatedData: Partial<Exercise>): Promise<void> {
    return this.firestore
      .doc(`exercises/${id}`)
      .update(updatedData) // Seules les données fournies seront mises à jour
      .then(() => console.log('Exercise updated!'))
      .catch((error) => console.error('Error updating exercise:', error));
  }

  deleteExercise(id: string): Promise<void> {
    return this.firestore
      .doc(`exercises/${id}`)
      .delete()
      .then(() => console.log('Exercise deleted!'))
      .catch((error) => console.error('Error deleting exercise:', error));
  }
}
