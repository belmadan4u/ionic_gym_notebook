import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private firestore: AngularFirestore) {}

    getUsers(): Observable<User[]> {
      const users$ = this.firestore.collection<User>('user').valueChanges();
      users$.subscribe(users => console.log('Fetched users:', users));
      return users$;
    }
  
    getUser(id: number): Observable<User | undefined> {
      const user$ = this.firestore.doc<User>('user/' + id).valueChanges();
      user$.subscribe(user => console.log('Fetched user:', user));
      return user$;
    }
}
