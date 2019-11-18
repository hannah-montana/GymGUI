export class User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  role: number;
  point: number;
  birthDate: string;
  level: number;
  status: string;
  email: string;
  note: string;
  photo: string;
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
  coachId: string;
  index: number;
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
  target: string;
  isChecked: string;
  coachId: string;
}

export class Program {
  id: string;
  name: string;
  description: string;
  numberOfSession: number;
  exId: string;
  sessId: string;
  coachId: string;
  note: string;
  point: number;
  isChecked: string;
  isFinished: string;
}

export class ProgramUser {
  id: string;
  progId: string;
  userId: string;
  coachId: string;
  point: number;
  isFinished: string;
}
