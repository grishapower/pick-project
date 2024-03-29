import { Rounds } from "@pickem/shared";

export const REWARD_POINTS = {
  NOMINATION_1: {
    nomination1: 5, //самая частая карта
    nomination2: 7, //самая нечастая карта
    nomination3: 5, //Какая команда сыграет больше всего карт
    nomination4: 3, //У какой команды будет лучший общий rating 2.0
    nomination5: 50, //MVP турнира
    nomination6: 15, //Лучший K/D турнира
    nomination7: 15, //Худший K/D турнира
    nomination8: 15, //Больше всего убийств
    nomination9: 15, //Больше всего асссистов
    nomination10: 15, //Лучший rating 2.0 в пистолетных раундах
    nomination11: 15, //Больше всего клатчей
    nomination12: 15, //Больше всего хедшотов
    nomination13: 7, //Больше всего убийств с AWP
    nomination14: 15, //Больше всего опенфрагов
    nomination15: 15, //Больше всего эйсов
    nomination16: 50, //Самые эффективные флешки
  },
  GROUP_SWISS_1: {
    threeZeroWinPoint: 20,
    threeZeroLosePoint: 20,
    listTeamPoint: 10,
  },
  PLAYOFF_SINGLE_ELIMINATION_1: {
    [Rounds.Semifinal]: 15,
    [Rounds.Final]: 30,
    [Rounds.Winner]: 60,
  },
};
