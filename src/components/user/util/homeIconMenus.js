import {
  artikel,
  chart,
  checkList,
  game,
  gift,
  nurse,
  pregnant,
  pregnatTrack
} from "../../../utils/svgs";

export const lineOne = [
  {
    xml: nurse,
    text: "Bidanku",
    to: "/user/tocologists"
  },
  {
    xml: chart,
    text: "Grafik Ibu",
    to: "/user"
  },
  {
    xml: pregnatTrack,
    text: "Track Kehamilan",
    to: "/user"
  },
  {
    xml: checkList,
    text: "Check list",
    to: "/user"
  }
];
export const lineTwo = [
  {
    xml: artikel,
    text: "Artikel",
    to: "/user"
  },
  {
    xml: gift,
    text: "Gift",
    to: "/user"
  },
  {
    xml: game,
    text: "Game",
    to: "/user"
  },
  {
    xml: pregnant,
    text: "Profile",
    to: "/user/profile"
  }
];
