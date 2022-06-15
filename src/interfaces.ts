export interface Person {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface Answer {
  status: number;
  body: string | Person | Person[] | null; 
}

export interface Method {
  (id: string): Answer
}