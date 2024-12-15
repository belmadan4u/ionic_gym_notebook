import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Program } from '../models/program';
import { Exercise } from '../models/exercise';
import { switchMap, map, from, forkJoin } from 'rxjs';
import { DocumentReference, Firestore } from 'firebase/firestore';
import { ExerciseSetsRepsCharge } from '../models/exerciseSetsRepsCharge';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private firestore: AngularFirestore) {}

  getPrograms(): Observable<Program[]> {
    return this.firestore.collection<Program>('programs').snapshotChanges().pipe(
      switchMap((snapshots) => {
        const programObservables = snapshots.map((snapshot) => {
          const programData = snapshot.payload.doc.data() as Program;
          const programId = snapshot.payload.doc.id; // Récupérer l'ID du document

          const exerciseObservables = programData.exercises.map((exerciseRef: ExerciseSetsRepsCharge) => {
            return from(this.firestore.doc<Exercise>(`exercises/${exerciseRef.exercise.id}`).get()).pipe(
              map((docSnapshot) => {
                const exerciseData = docSnapshot.data() as Exercise;
                return {
                  ...exerciseRef, // Sets, reps, charge
                  exercise: {
                    ...exerciseData,
                    id: parseInt(docSnapshot.id), // ID de l'exercice
                  },
                };
              })
            );
          });

          // Attendre que tous les exercices soient récupérés
          return forkJoin(exerciseObservables).pipe(
            map((exercises) => ({
              ...programData,
              id: programId, // Ajouter l'ID du programme
              exercises, // Remplacer par les exercices avec leurs détails
            }))
          );
        });

        // Attendre que tous les programmes soient récupérés
        return forkJoin(programObservables);
      })
    );
  }
  

  getProgram(id: string): Observable<Program | undefined> {
    return this.firestore.doc<Program>('programs/'+id).snapshotChanges().pipe(
      // Transform snapshot data into Programs
      switchMap((snapshot) => {
          const programData = snapshot.payload.data() as Program;
          const programId = snapshot.payload.id; 
  
          const exerciseObservables = programData.exercises.map((exerciseRef: ExerciseSetsRepsCharge) => {
            // Fetch the Exercise document using the reference
            return from(this.firestore.doc<Exercise>(`exercises/${exerciseRef.exercise.id}`).get()).pipe(
              map((docSnapshot) => {
                const exerciseData = (docSnapshot as DocumentSnapshot<Exercise>).data() as Exercise;
                return {
                  ...exerciseRef, // Keep sets, reps, charge
                  exercise: new Exercise(
                    parseInt((docSnapshot as DocumentSnapshot<Exercise>).id),
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
              ...programData,
              id: programId, // Ajoute l'ID du programme ici
              exercises, // Replace with fetched exercises
            }))
          );
        })
      )
    
  }

  addProgram(program: Program): Promise<void> {
    return this.firestore.collection('programs').doc(program.id).set(program)
    .then(() => console.log('Program added!'))
    .catch((error) => console.error('Error adding program:', error));
  }

  updateProgram(id: string, updatedData: Program): Promise<void> {
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