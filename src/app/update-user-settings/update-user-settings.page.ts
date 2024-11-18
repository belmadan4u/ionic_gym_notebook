import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { User } from '../models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'update-user-settings',
  templateUrl: './update-user-settings.page.html',
  styleUrls: ['./update-user-settings.page.scss'],
})
export class UpdateUserSettingsPage implements OnInit {
  userForm!: FormGroup;

  // Exemple de données utilisateur initiales
  user!: User;

  constructor(private location: Location, private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser(1).subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = new User('inconnu', true, 75, 175, 20)
      } 
      this.userForm = this.formBuilder.group({
          name: [this.user.name, [Validators.required, Validators.minLength(2)]],
          male: [this.user.male, Validators.required],
          weight: [this.user.weight, [Validators.required, Validators.min(1)]],
          height: [this.user.height, [Validators.required, Validators.min(50)]],
          age: [this.user.age, [Validators.required, Validators.min(1)]],
        });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Mettre à jour les informations utilisateur avec les données du formulaire
      this.user = { ...this.user, ...this.userForm.value };
      this.userService.updateUser(1, this.user).then(() => {
        // Afficher un message ou effectuer une action
        console.log('Informations utilisateur mises à jour :', this.user);
  
        // Revenir à la route précédente
        this.location.back();
      });
    }
  }
}
