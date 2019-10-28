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

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
};
