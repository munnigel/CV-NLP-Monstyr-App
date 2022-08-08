export class Account {
  constructor(
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public account_type: string,
    public profile_pic?: string
  ) {}
}
