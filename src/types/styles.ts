export type Theme = {
  primaryBg: string;
  secondaryBg: string;
  primaryText: string;
  highlightBackground: string;
  mainPurple: string;
  mainPurpleHover: string;
  red: string;
  redHover: string;
  secondaryText: string;
  white: string;
  isLightTheme: boolean;
};

export enum ThemeOptions {
  Light = "light",
  Dark = "dark",
}
