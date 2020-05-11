export class Guest {
  public forename: string;
  public surname: string;
  public phone: string;
  public friends: number;
  public date: Date;
  public status: Status;
}

export enum Status {
  booked = 'booked',
  arrived = 'arrived',
  left = 'left'
}
