import actions from './actions';
import { isCurrentThemeDark } from './config';

const defaultTheme = 'dark';

const initState = {
  themeName: defaultTheme,
  isDark: isCurrentThemeDark(defaultTheme)
};

export default function ThemesSwitcher(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_THEME:
      return {
        themeName: action.payload.theme,
        isDark: isCurrentThemeDark(action.payload.theme)
      };
    default:
      return state;
  }
}
