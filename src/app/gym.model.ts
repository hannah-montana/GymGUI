export class User {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;

    id: string;
    role: number;
    coin: number;
    birthDate: Date;
    level: number;
    status: string;
}

export class Session {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  focusSession: number;
  validated: number;
  sendReported: number;
}

export class Exercise {
  id: string;
  name: string;
  description: string;
  instruction: string;
  duration: string;
  level: string;
  type: string;
  calorie: string;
  photo: string;
  point: string;
  frequency: string;
  benefit: string;
  isChecked: string;
  target: string;
}
