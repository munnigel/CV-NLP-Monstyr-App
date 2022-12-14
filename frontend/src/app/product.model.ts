export class Product {
  constructor(
    public id?: number,
    public sp_id?: number,
    public pid?: number,
    public status?: string,
    public genTitle?: string[],
    public selectedTitle?: object,
    public title?: string,
    public genCategories?: string[],
    public categories?: string[],
    public genStartDate?: Date,
    public startDate?: Date,
    public genEndDate?: Date,
    public endDate?: Date,
    public genTags?: string[],
    public tags?: string[],
    public genContent?: string,
    public content?: string,
    public ODImage?: string[],
    public OCRImage?: string[],
    public images?: string,
    public score?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public ODLatency?: number,
    public OCRLatency?: number,
    public NERDateLatency?: number,
    public NERCategoriesLatency?: number,
    public NERTitleLatency?: number
  ) {}
}
