export class Ingredient {

    Id: number;
    Title: string;
    Description: string;
    CreatedOn: Date;

    constructor(id: number, title: string, description: string, createdOn: Date)
    {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.CreatedOn = createdOn;
    }
}