export class PendingProduct {
  constructor(
    public category: string,
    public imgUrl: string,
    public title: string,
    public description: string,
    public promotionDate: string,
    public id?: number,
  ) { }
}
