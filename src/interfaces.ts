export interface Person {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface Answer {
  status: string;
  message?: string;
  data?: Person | Person[]; 
}