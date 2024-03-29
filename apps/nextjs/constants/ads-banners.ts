import { StaticImageData } from "next/image";

import en_leaderboardImg from "~/images/systems/adsImg/en/leaderboard.png";
import en_mainSliderImg from "~/images/systems/adsImg/en/main_slider.png";
import en_mobileNavImg from "~/images/systems/adsImg/en/mobile_nav.png";
import en_pickemSidebarImg from "~/images/systems/adsImg/en/pickem_sidebar.png";
import en_topBannerImg from "~/images/systems/adsImg/en/top_banner.png";

export const ADS_BANNERS: {
  [x: string]: {
    [x: string]: {
      img?: StaticImageData;
      link: string;
    };
  };
} = {
  ru: {
    mainSide: {
      img: undefined,
      link: "https://www.google.com/",
    },
    mainSlider: {
      img: en_mainSliderImg,
      link: "https://www.google.com/",
    },
    mainSliderMobile: {
      img: en_mainSliderImg,
      link: "https://www.google.com/",
    },
    leaderboard: {
      img: en_leaderboardImg,
      link: "https://www.google.com/",
    },
    mobileNav: {
      img: en_mobileNavImg,
      link: "https://www.google.com/",
    },
    pickemSidebar: {
      img: en_pickemSidebarImg,
      link: "https://www.google.com/",
    },
    topBanner: {
      img: en_topBannerImg,
      link: "https://www.google.com/",
    },
    topBannerMobile: {
      img: en_topBannerImg,
      link: "https://www.google.com/",
    },
  },
  en: {
    mainSide: {
      img: undefined,
      link: "https://www.google.com/",
    },
    mainSlider: {
      img: en_mainSliderImg,
      link: "https://www.google.com/",
    },
    mainSliderMobile: {
      img: en_mainSliderImg,
      link: "https://www.google.com/",
    },
    leaderboard: {
      img: en_leaderboardImg,
      link: "https://www.google.com/",
    },
    mobileNav: {
      img: en_mobileNavImg,
      link: "https://www.google.com/",
    },
    pickemSidebar: {
      img: en_pickemSidebarImg,
      link: "https://www.google.com/",
    },
    topBanner: {
      img: en_topBannerImg,
      link: "https://www.google.com/",
    },
    topBannerMobile: {
      img: en_topBannerImg,
      link: "https://www.google.com/",
    },
  },
};
