export interface Navigation {
  name?: string;
  path?: string;
  icon?: string;
  label?: string;
  type?: string;
  iconText?: string;
  children?: NavigationChild[];
  badge?: NavigationBadge;
}

export interface NavigationChild {
  name: string;
  path: string;
  iconText: string;
}

export interface NavigationBadge {
  value: string;
  color: string;
}

export const navigations: Navigation[] = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { label: "Manajemen Data", type: "label" },
  {
    name: "Standar Mutu",
    icon: "list",
    children: [
      { name: "Daftar Nilai Mutu", iconText: "NM", path: "/nilai-mutu" },
      { name: "Daftar Standar Mutu", iconText: "SM", path: "/standar-mutu" },
    ],
  },
  {
    name: "Evaluasi Diri",
    icon: "edit_note",
    children: [
      { name: "Pengaturan Periode", iconText: "PP", path: "/periode" },
      { name: "Target Nilai Mutu", iconText: "TN", path: "/target-nilai" },
      { name: "Evaluasi Diri", iconText: "ED", path: "/evaluasi-diri" },
    ],
  },
  { name: "Auditor", path: "/auditor", icon: "groups" },
  {
    name: "Manajemen Referensi",
    icon: "widgets",
    children: [
      { name: "Fakultas", iconText: "F", path: "/fakultas" },
      { name: "Unit Penunjang", iconText: "UN", path: "/unit-penunjang" },
      { name: "Prodi", iconText: "P", path: "/prodi" },
      {
        name: "Lembaga Akreditasi",
        iconText: "LA",
        path: "/lembaga-akreditasi",
      },
      { name: "Standar Nasional", iconText: "SN", path: "/standar-nasional" },
      { name: "Tahun Periode", iconText: "TP", path: "/tahun-periode" },
    ],
  },

  { label: "PAGES", type: "label" },
  {
    name: "Session/Auth",
    icon: "security",
    children: [
      { name: "Sign in", iconText: "SI", path: "/session/signin" },
      { name: "Sign up", iconText: "SU", path: "/session/signup" },
      {
        name: "Forgot Password",
        iconText: "FP",
        path: "/session/forgot-password",
      },
      { name: "Error", iconText: "404", path: "/session/404" },
    ],
  },
  { label: "Components", type: "label" },
  {
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      {
        name: "Expansion Panel",
        path: "/material/expansion-panel",
        iconText: "E",
      },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" },
    ],
  },
  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
  },
  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "http://demos.ui-lib.com/matx-react-doc/",
  },
];
