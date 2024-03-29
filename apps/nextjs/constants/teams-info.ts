import { StaticImageData } from "next/image";
import pandasLogo from "~/images/systems/teams/9pandas.png";
import amkalLogo from "~/images/systems/teams/amkal.svg";
import apeksLogo from "~/images/systems/teams/apeks.png";
import cloud9Logo from "~/images/systems/teams/cloud9.svg";
import complexityLogo from "~/images/systems/teams/complexity.svg";
import ecstaticLogo from "~/images/systems/teams/ecstatic.png";
import enceLogo from "~/images/systems/teams/ence.svg";
import eternalFireLogo from "~/images/systems/teams/eternal-fire.png";
import fazeLogo from "~/images/systems/teams/fazeLogo.png";
import furiaLogo from "~/images/systems/teams/furia.svg";
import g2Logo from "~/images/systems/teams/g2Logo.png";
import heroicLogo from "~/images/systems/teams/heroic.svg";
import imperialLogo from "~/images/systems/teams/imperial.png";
import koiLogo from "~/images/systems/teams/koi.png";
import legacyLogo from "~/images/systems/teams/legacy.png";
import lynnVisionLogo from "~/images/systems/teams/lynn-vision.png";
import mouzLogo from "~/images/systems/teams/mouzLogo.svg";
import naviLogo from "~/images/systems/teams/NaviLogo.svg";
import painLogo from "~/images/systems/teams/pain.svg";
import SawLogo from "~/images/systems/teams/saw.webp";
import spiritLogo from "~/images/systems/teams/spirit.svg";
import theMongolzLogo from "~/images/systems/teams/the-mongols.png";
import virtusProLogo from "~/images/systems/teams/VirtusProLogo.svg";
import vitalityLogo from "~/images/systems/teams/vitality.png";

export const TEAMS_INFO: {
  [x: number]: {
    name: string;
    feedBbName?: string;
    id: number;
    icon: StaticImageData;
    players: number[];
  };
} = {
  1: {
    name: "9pandas",
    feedBbName: "9 pandas",
    id: 1,
    icon: pandasLogo,
    players: [81, 82, 83, 84, 85],
  },
  2: {
    name: "Amkal",
    feedBbName: "AMKAL ESPORTS",
    id: 2,
    icon: amkalLogo,
    players: [31, 32, 33, 34, 35],
  },
  3: {
    name: "Apeks",
    id: 3,
    icon: apeksLogo,
    players: [61, 62, 63, 64, 65],
  },
  4: {
    name: "Cloud9",
    id: 4,
    icon: cloud9Logo,
    players: [41, 42, 43, 44, 45],
  },
  5: {
    name: "Ecstatic",
    id: 5,
    icon: ecstaticLogo,
    players: [71, 72, 73, 74, 75],
  },
  6: {
    name: "Ence",
    id: 6,
    icon: enceLogo,
    players: [76, 77, 78, 79, 80],
  },
  7: {
    name: "Eternal fire",
    id: 7,
    icon: eternalFireLogo,
    players: [36, 37, 38, 39, 40],
  },
  8: {
    name: "FaZe",
    id: 8,
    icon: fazeLogo,
    players: [16, 17, 18, 19, 20],
  },
  9: {
    name: "G2",
    id: 9,
    icon: g2Logo,
    players: [6, 7, 8, 9, 10],
  },
  10: {
    name: "Heroic",
    id: 10,
    icon: heroicLogo,
    players: [66, 67, 68, 69, 70],
  },
  11: {
    name: "KOI",
    id: 11,
    icon: koiLogo,
    players: [21, 22, 23, 24, 25],
  },
  12: {
    name: "Mouz",
    id: 12,
    icon: mouzLogo,
    players: [46, 47, 48, 49, 50],
  },
  13: {
    name: "NaVi",
    id: 13,
    icon: naviLogo,
    players: [11, 12, 13, 14, 15],
  },
  14: {
    name: "SAW",
    id: 14,
    icon: SawLogo,
    players: [26, 27, 28, 29, 30],
  },
  15: {
    name: "Spirit",
    id: 15,
    icon: spiritLogo,
    players: [56, 57, 58, 59, 60],
  },
  16: {
    name: "Virtus pro",
    id: 16,
    icon: virtusProLogo,
    players: [1, 2, 3, 4, 5],
  },
  17: {
    name: "Vitality",
    id: 17,
    players: [51, 52, 53, 54, 55],
    icon: vitalityLogo,
  },
  18: {
    name: "FURIA",
    feedBbName: "FURIA Esports",
    id: 18,
    players: [86, 87, 88, 89, 90],
    icon: furiaLogo,
  },
  19: {
    name: "TheMongolz",
    feedBbName: "The MongolZ",
    id: 19,
    players: [91, 92, 93, 94, 95],
    icon: theMongolzLogo,
  },
  20: {
    name: "Imperial",
    feedBbName: "Imperial Esports",
    id: 20,
    players: [96, 97, 98, 99, 100],
    icon: imperialLogo,
  },
  21: {
    name: "Legacy",
    id: 21,
    players: [101, 102, 103, 104, 105],
    icon: legacyLogo,
  },
  22: {
    name: "paiN",
    feedBbName: "paiN Gaming",
    id: 22,
    players: [106, 107, 108, 109, 110],
    icon: painLogo,
  },
  23: {
    name: "Lynn Vision",
    feedBbName: "Lynn Vision Gaming",
    id: 23,
    players: [111, 112, 113, 114, 115],
    icon: lynnVisionLogo,
  },
  24: {
    name: "Complexity",
    id: 24,
    players: [116, 117, 118, 119, 120],
    icon: complexityLogo,
  },
};
