export interface Guest {
  forename: string;
  surname: string;
  phone: string;
  friends: number;
  date: number;
  status: Status;
}

export enum Status {
  booked = 'booked',
  arrived = 'arrived',
}
