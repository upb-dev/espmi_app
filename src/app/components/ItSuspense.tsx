import ItLoading from "../components/ItLoading";
import React, { Suspense } from "react";

const ItSuspense = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<ItLoading />}>{children}</Suspense>;
};

export default ItSuspense;
