export class User {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  role: number;
  point: number;
  calorie: number;
  duration: number;
  birthDate: string;
  level: number;
  status: string;
  email: string;
  note: string;
  photo: string;
  coachId: string;
  badge: string;
  gender: string;
  purpose: string;
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
  order: number;
  parentId: string;
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
  praticalDuration: string;
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

export class Notification {
  id: string;
  notifyContent: string;
  fromUser: string;
  toUser: string;
  dateAction: string;
  read: string;
  focusSessionId: string;
  validatedFromCustomer: string;
  validatedFromCoach: string;
}

export class History{
  id: string;
  proUsId: string;
  progId: string;
  userId: string;
  sessId: string;
  exId: string;
  focusSession: number;
  praticalDuration: number;
  duration: number;
  point: number;
  calorie: number;
  order: number;
  processing: string;
  dateAction: string;
  level: string;
  sendValidateFS: string;
  validatedByCoach: string;
  name: string;
  description: string;
  instruction: string;
  type: string;
  photo: string;
  calories: number;
  target: string;
}

export class Report{
  id: string;
  completedWeeklyDeadline: string;
  thinkAboutSession: string;
  readyNextSession: string;
  comment: string;
  sessId1: string;
  sessId2: string;
  custId: string;
  coachId: string;
  dateAction: string;
}

export class CustomerDashboard {
  id: string;
  point: number;
  calorie: number;
  duration: number;
  numEx: number;
}

export class CurrentCustomer {
  id: string;
  point: number;
  calorie: number;
  pracDuration: number;
  numEx: number;
  numExEasy: number;
  numExMedium: number;
  numExDifficult: number;
}

export class Ranking {
  id: string;
  firstName: string;
  lastName: string;
  point: number;
  rank: number;
  calorie: number;
  duration: number;
  badge: string;
}

export class CoachDashboard {
  noEasyEx: number;
  noMedEx: number;
  noDifEx: number;
  noEasySess: number;
  noMedSess: number;
  noDifSess: number;
  noCustomer: number;
  noProgram: number;
  noSession: number;
  noExercise: number;
  noMale: number;
  noFemale: number;
  noUndefined: number;
}
export class BarChart {
  noLevel1: number;
  noLevel2: number;
  noLevel3: number;
  noLevel4: number;
  noLevel5: number;
}
export class AreaChart {
  id: number;
  point: number;
  calorie: number;
  duration: number;

}
