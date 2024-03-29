import {
  CupIcon,
  GroupIcon,
  NominationIcon,
  StageIcon,
  TimeIcon,
} from "~/images/icons";

//в бд мы ставим иконку тк у всех разные могут быть
//если придумаю как по другому - убрать это
export const STAGES_ICONS = {
  timeIcon: <TimeIcon />,
  cupIcon: <CupIcon />,
  groupIcon: <GroupIcon />,
  playoffIcon: <StageIcon />,
  nominationIcon: <NominationIcon />,
};
