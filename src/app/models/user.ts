export class User {
    name: string;
    male: boolean;
    weight: number;
    height: number;
    age: number;

    constructor(name: string, male: boolean, weight: number, height: number, age: number) {
        this.name = name;
        this.male = male;
        this.weight = weight;
        this.height = height;
        this.age = age;
    }
}
