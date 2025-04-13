export type NewHaiku = Omit<Haiku, "id">;

export type Haiku = {
  id: number;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
};
