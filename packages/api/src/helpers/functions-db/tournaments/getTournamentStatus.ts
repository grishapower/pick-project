enum TOURNAMENT_STATUS_ENUM {
  "Upcoming" = "upcoming",
  "InProgress" = "inProgress",
  "Finished" = "finished",
}

export const getTournamentStatus = (from: string, to: string) => {
  const currentDate = new Date();
  const startDate = new Date(from);
  const endDate = new Date(to);

  if (currentDate < startDate) {
    return TOURNAMENT_STATUS_ENUM.Upcoming; // Турнир еще не начался
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return TOURNAMENT_STATUS_ENUM.InProgress; // Турнир идет
  } else {
    return TOURNAMENT_STATUS_ENUM.Finished; // Турнир закончился
  }
};
