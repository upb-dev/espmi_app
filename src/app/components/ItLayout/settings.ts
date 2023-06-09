import { themes } from '../ItTheme/initThemes';
import layout1Settings from './Layout1/Layout1Settings';

interface SecondarySidebar {
  show: boolean;
  open: boolean;
  theme: string;
}

interface Footer {
  show: boolean;
  fixed: boolean;
  theme: string;
}

export interface ItLayoutSettingsType {
  activeLayout: string;
  activeTheme: string;
  perfectScrollbar: boolean;
  themes: typeof themes;
  layout1Settings: typeof layout1Settings;
  secondarySidebar: SecondarySidebar;
  footer: Footer;
}

// UPDATE BELOW CODE
// DOC http://demos.ui-lib.com/matx-react-doc/layout.html
// export const ItLayoutSettings = {
//   activeLayout: 'layout1', // layout1, layout2
//   activeTheme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
//   perfectScrollbar: false,

//   themes: themes,
//   layout1Settings, // open Layout1/Layout1Settings.js

//   secondarySidebar: {
//     show: true,
//     open: false,
//     theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
//   },
//   // Footer options
//   footer: {
//     show: true,
//     fixed: false,
//     theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
//   },
// };

export const ItLayoutSettings: ItLayoutSettingsType = {
  activeLayout: 'layout1',
  activeTheme: 'blue',
  perfectScrollbar: false,
  themes: themes,
  layout1Settings: layout1Settings,
  secondarySidebar: {
    show: true,
    open: false,
    theme: 'slateDark1',
  },
  footer: {
    show: true,
    fixed: false,
    theme: 'slateDark1',
  },
};
