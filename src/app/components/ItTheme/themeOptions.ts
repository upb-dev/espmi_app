import { red } from '@mui/material/colors';
import { components } from './components';
import { ThemeOptions } from '@mui/material';


const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 14,
    body1: { fontSize: '14px' },
  },

  status: { danger: red[500] },
  components: { ...components },
};

export default themeOptions;
