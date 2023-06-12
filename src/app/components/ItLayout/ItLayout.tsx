// import ItSuspense from "../../components/ItSuspense";
import useSettings from "../../hooks/useSettings";
import ItSuspense from "../ItSuspense";
import { ItLayouts } from "./index";
// TODO aktifasi Layout

const ItLayout = (props: any) => {
  const { settings } = useSettings();
  // const Layout = ItLayouts[settings.activeLayout];

  return <ItSuspense>{/* <Layout {...props}> */}</ItSuspense>;
};

export default ItLayout;
