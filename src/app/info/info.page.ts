import { Component } from '@angular/core';
import { User } from '../models/user'; 
import { UserService } from '../user.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage {

  user!: User; 

  imc: string = '';
  bmr: number = 0;
  bodyFat: string = '';
  imcCategory: string = '';

  ngOnInit() {
    this.userService.getUser(1).subscribe(user => {
      if (user) {
        this.user = user;
        console.log(user);
        this.imc = this.calculateIMC(this.user.weight, this.user.height);
        this.bmr = this.calculateBMR(this.user.weight, this.user.height, this.user.age, this.user.male);
        this.bodyFat = this.estimateBodyFat(this.imc, this.user.age, this.user.male);
      } else {
        this.user = new User('inconnu', true, 75, 175, 20);
        this.imc = this.calculateIMC(this.user.weight, this.user.height);
        this.bmr = this.calculateBMR(this.user.weight, this.user.height, this.user.age, this.user.male);
        this.bodyFat = this.estimateBodyFat(this.imc, this.user.age, this.user.male);
      }
    });
  }

  constructor(private userService: UserService) {}

  calculateIMC(weight: number, height: number): string {
    const heightInMeters = height / 100;
    const bmr = (weight / (heightInMeters ** 2)).toFixed(2);

    this.imcCategory = this.getIMCCategory(parseFloat(bmr)); 
    return bmr;
  }

  getIMCCategory(imc: number): string {
    switch (true) {
      case (imc < 18.5):
        return "Insuffisance pondérale (maigreur)";
      case (imc >= 18.5 && imc <= 24.9):
        return "Corpulence normale";
      case (imc >= 25 && imc <= 29.9):
        return "Surpoids";
      case (imc >= 30 && imc <= 34.9):
        return "Obésité modérée";
      case (imc >= 35 && imc <= 39.9):
        return "Obésité sévère";
      case (imc >= 40):
        return "Obésité morbide ou massive";
      default:
        return "Invalide"; 
    }
  }

  calculateBMR(weight: number, height: number, age: number, male: boolean): number {
    if (male) {
      return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
    } else {
      return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
    }
  }

  estimateBodyFat(imc: string, age: number, male: boolean): string {
    const imcValue = parseFloat(imc);
    if (male) {
      return (1.20 * imcValue + 0.23 * age - 16.2).toFixed(2);
    } else {
      return (1.20 * imcValue + 0.23 * age - 5.4).toFixed(2);
    }
  }

}
