export class Product {
  constructor(
    public imgUrl: string,
    public title: string,
    public category: string,
    public promotionDate: string,
    public description: string,
    public titleSuggestion?: string[],
    public descriptionSuggestion?:string[], 
  ) {}
}

