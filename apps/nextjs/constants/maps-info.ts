import { MapsEnum } from "@pickem/shared";
import { StaticImageData } from "next/image";
import anctientPath from "~/images/systems/maps/ancient.png";
import anubisPath from "~/images/systems/maps/anubis.png";
import infernoPath from "~/images/systems/maps/inferno.png";
import miragePath from "~/images/systems/maps/mirage.png";
import nukePath from "~/images/systems/maps/nuke.png";
import overpassPath from "~/images/systems/maps/overpass.png";
import vertigoPath from "~/images/systems/maps/vertigo.png";

export const MAPS_INFO: {
  [x: number]: {
    name: string;
    img: StaticImageData;
    id: MapsEnum;
  };
} = {
  [MapsEnum.Ancient]: {
    name: "Ancient",
    img: anctientPath,
    id: MapsEnum.Ancient,
  },
  [MapsEnum.Anubis]: {
    img: anubisPath,
    name: "Anubis",
    id: MapsEnum.Anubis,
  },
  [MapsEnum.Inferno]: {
    img: infernoPath,
    name: "Inferno",
    id: MapsEnum.Inferno,
  },
  [MapsEnum.Mirage]: {
    img: miragePath,
    name: "Mirage",
    id: MapsEnum.Mirage,
  },
  [MapsEnum.Nuke]: {
    img: nukePath,
    name: "Nuke",
    id: MapsEnum.Nuke,
  },
  [MapsEnum.Overpass]: {
    img: overpassPath,
    name: "Overpass",
    id: MapsEnum.Overpass,
  },
  [MapsEnum.Vertigo]: {
    img: vertigoPath,
    name: "Vertigo",
    id: MapsEnum.Vertigo,
  },
};
