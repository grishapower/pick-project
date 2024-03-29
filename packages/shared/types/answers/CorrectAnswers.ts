export type CorrectAnswers = {
  [x: string]: any;
};

export type correctAnswersNominations = {
  [x: string]: string;
};

export type correctAnswersGroup = {
  quaterfinal: number[];
  semifinal: number[];
};

export type correctAnswersPlayoff = {
  quaterfinal: { [x: string]: number };
  semifinal: { [x: string]: number };
  final: { [x: string]: number };
  winner: { [x: string]: number };
};
