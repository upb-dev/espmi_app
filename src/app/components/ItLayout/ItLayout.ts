import { MatxSuspense } from '../../components';
import useSettings from '../../hooks/useSettings';
import { ItLayouts } from './index';

const ItLayout = (props) => {
  const { settings } = useSettings();
  const Layout = ItLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default ItLayout;
