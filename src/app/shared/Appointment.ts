export class Appointment {
  $key: string;
  number: string;
  date: Date;
  travelTimeStart: number;
  travelTimeEnd: number;
  workTimeStart: number;
  workTimeEnd: number;
  startPosition: Geo;
  endPosition: Geo;
}

export class Geo {
  latitude: number;
  longitude: number;
}

export class Interval {
  start: number;
  end: number;
}
