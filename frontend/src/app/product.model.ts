export class Product {
  constructor(
    public title: string,
    public category: string,
    public promotionDate: string,
    public description: string,
    public id?: number,
    public imgUrl?: string,
    public titleSuggestion?: string[],
    public descriptionSuggestion?: string[],
  ) { }
}

