export interface Layout1Type {
  leftSidebar: {
    show:boolean,
    mode: string, // full, close, compact, mobile,
    theme: string, // View all valid theme colors inside MatxTheme/themeColors.js
    bgImgURL?: string,
    bgOpacity? : number
  },
  topbar: {
    show?: boolean,
    fixed?: boolean,
    theme: string, // View all valid theme colors inside MatxTheme/themeColors.js
  },
}

const Layout1Settings: Layout1Type = {
    leftSidebar: {
      show: true,
      mode: 'full', // full, close, compact, mobile,
      theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
      bgImgURL: '/assets/images/sidebar/sidebar-bg-dark.jpg',
    },
    topbar: {
      show: true,
      fixed: true,
      theme: 'whiteBlue', // View all valid theme colors inside MatxTheme/themeColors.js
    },
  };
  
  export default Layout1Settings;
  