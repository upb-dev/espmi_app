import { Box } from "@mui/material";
import RootPage from "../../RootPage";
import { RouteSegment } from "../../../components/Breadcrumb";

const TargetNilaiPage = () => {
  const routeSegments: RouteSegment[] = [
    { name: "Target Nilai", path: "/target-nilai" },
    { name: "List Target Nilai" },
  ];
  return (
    <RootPage routeSegments={routeSegments}>
      <Box paddingBottom={2}>ini halaman target nilai</Box>
    </RootPage>
  );
};

export default TargetNilaiPage;
