export class Exercise{
    id: number;
    name: string;
    muscles : string[];
    description : string;
    image: string;

    constructor(id: number, name: string, muscles: string[], description: string, image: string) {
        this.id = id;
        this.name = name;
        this.muscles = muscles;
        this.description = description;
        this.image = image;
    }
}
 