export type Prize = {
  img: string; //
  name: string; //
  type: "SKIN" | "FREEBET"; //
  prizeId: number;
  winPositionStart: number; //
  winPositionEnd: number | null; //
};
