import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Program } from '../models/program';
import { Exercise } from '../models/exercise';
import { switchMap, map, from, forkJoin } from 'rxjs';
import { Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private firestore: AngularFirestore) {}

  getPrograms(): Observable<Program[]> {
    return this.firestore.collection<Program>('programs').valueChanges().pipe(
      // Transform each program's exercises
      switchMap((programs) => {
        const programObservables = programs.map((program) => {
          const exerciseObservables = program.exercises.map((exerciseRef: any) => {
            // Fetch the Exercise document using the reference
            return from((exerciseRef.exercise).get()).pipe(
              map((docSnapshot) => {
                const exerciseData = (docSnapshot as DocumentSnapshot<Exercise>).data() as Exercise;
                return {
                  ...exerciseRef, // Keep sets, reps, charge
                  exercise: new Exercise(
                    parseInt((docSnapshot as DocumentSnapshot<Exercise>).id, 10),
                    exerciseData.name,
                    exerciseData.muscles,
                    exerciseData.description,
                    exerciseData.image
                  ),
                };
              })
            );
          });
  
          // Combine all exercise observables for this program
          return forkJoin(exerciseObservables).pipe(
            map((exercises) => ({
              ...program,
              exercises, // Replace with fetched exercises
            }))
          );
        });
  
        // Combine all program observables
        return forkJoin(programObservables);
      })
    );
  }
  
  // Ajoutez cette méthode pour récupérer un exercice depuis une référence
  getExerciseFromPath(path: string): Exercise {
    // Simule une recherche d'exercice à partir d'une référence
    const id = parseInt(path.split('/').pop() || '0', 10); // Extraire l'ID depuis "/exercises/10"
    // Vous pouvez implémenter une logique ici pour récupérer l'exercice réel depuis Firestore si nécessaire
    return new Exercise(id, 'Exemple', ['Muscle1'], 'Description', 'ImageURL');
  }

  getProgram(id: string): Observable<Program | undefined> {
    return this.firestore.doc<Program>('programs/' + id).valueChanges();
  }

  addProgram(program: Program): Promise<void> {
    const id = this.firestore.createId(); // Generate a unique ID
    return this.firestore
      .doc(`programs/${id}`)
      .set({ ...program, id }) // Add the generated ID to the data
      .then(() => console.log('Program added!'))
      .catch((error) => console.error('Error adding program:', error));
  }

  updateProgram(id: string, updatedData: Partial<Program>): Promise<void> {
    return this.firestore
      .doc(`programs/${id}`)
      .update(updatedData) // Only the provided data will be updated
      .then(() => console.log('Program updated!'))
      .catch((error) => console.error('Error updating program:', error));
  }

  deleteProgram(id: string): Promise<void> {
    return this.firestore
      .doc(`programs/${id}`)
      .delete()
      .then(() => console.log('Program deleted!'))
      .catch((error) => console.error('Error deleting program:', error));
  }
}