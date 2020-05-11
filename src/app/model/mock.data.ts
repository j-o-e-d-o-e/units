import {Status, Guest} from './guest.model';

export class MockData {
  static guests: Guest[] = [
    {
      forename: "Joe" ,
      surname: "Doe" ,
      phone: "666 666",
      friends: 3,
      date: new Date(2020, 4, 5, 18),
      status: Status.left
    },
    {
      forename: "Joe" ,
      surname: "" ,
      phone: "666 666",
      friends: 4,
      date: new Date(2020, 4, 6, 16),
      status: Status.left
    },
    {
      forename: "Joe" ,
      surname: "Doe" ,
      phone: "666 666",
      friends: 5,
      date: new Date(2020, 4, 7, 20),
      status: Status.arrived
    },
    {
      forename: "Joe" ,
      surname: "" ,
      phone: "666 666",
      friends: 3,
      date: new Date(2020, 4, 8, 16),
      status: Status.arrived
    },
    {
      forename: "Joe" ,
      surname: "Doe" ,
      phone: "666 666",
      friends: 4,
      date: new Date(2020, 4, 9, 20),
      status: Status.booked
    },
    {
      forename: "Joe" ,
      surname: "" ,
      phone: "666 666",
      friends: 5,
      date: new Date(2020, 4, 10, 18),
      status: Status.booked
    }
  ];
}
