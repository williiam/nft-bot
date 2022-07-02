import { lightTheme, darkTheme } from '../theme'

export const getTheme = (theme:string| undefined): typeof lightTheme =>{
  switch (theme) {
    case "light":
      return lightTheme;
      break;
    case "dark":
      return darkTheme;
      break;
    default:
      return lightTheme;
      break;
  }
}

export const getToggleTheme = (theme:string|undefined):string => {
  switch (theme) {
    case "light":
      return "dark";
      break;
    case "dark":
      return "light";
      break;
    default:
      return "dark";
      break;
  }
}