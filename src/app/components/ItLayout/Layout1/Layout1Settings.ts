export interface Layout1SettingsType {
  leftSidebar: {
    show: boolean;
    mode: string; // full, close, compact, mobile,
    theme: string; // View all valid theme colors inside MatxTheme/themeColors.js
    bgImgURL: string;
    bgOpacity?: number;
  };
  topbar: {
    show: boolean;
    fixed: boolean;
    theme: string; // View all valid theme colors inside MatxTheme/themeColors.js
  };
}
