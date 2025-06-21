export type Person = {
  name: string;
  age: number;
};

export type PersonGraph = [Person, PersonGraph[]];
