import useSettings from "../../hooks/useSettings";
import ItSuspense from "../ItSuspense";
import { ItLayouts } from "./index";

const ItLayout = (props: any) => {
  const { settings } = useSettings();
  const Layout = ItLayouts[settings.activeLayout];

  return (
    <ItSuspense>
      <Layout {...props} />
    </ItSuspense>
  );
};

export default ItLayout;
