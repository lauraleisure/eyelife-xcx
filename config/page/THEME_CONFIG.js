const Red = "red";
const Black = "#000000";
const White = "#ffffff";
const DarkGray = "#333333";
const VeryLightGrey = "#f0f0f0";
const ThemeMainBack = "#ffffff";
const ThemeMainRed = "#771515";
const ThemeSecondGreen = "#113942";

module.exports = {
  DAY:{
    themeKey:"day",
    header:{
      fontColor:Black,
      backgroundColor: VeryLightGrey
    },
    background: VeryLightGrey,
    backgroundColor: VeryLightGrey,
    fontColor: DarkGray,
    containerColor: VeryLightGrey,
    mainForeColor: ThemeMainRed,
    secondForeColor: ThemeSecondGreen,
    navItemHighlightBackColor:ThemeMainRed,
    navItemHighlightForeColor: ThemeMainBack
  },
  NIGHT:{
    themeKey:"night",
    header: {
      fontColor: White,
      backgroundColor: Black
    },
    background: ThemeMainBack,
    backgroundColor: Black,
    fontColor: ThemeMainBack,
    containerColor: "gray",
    mainForeColor: ThemeSecondGreen,
    secondForeColor: ThemeMainRed,
    navItemHighlightBackColor: ThemeMainRed,
    navItemHighlightForeColor: ThemeMainBack
  }
}
