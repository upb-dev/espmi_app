import ItLoading from "../components/ItLoading";
import React, { Suspense } from "react";

interface IsSuspenceProps {
  children: React.ReactNode;
}

const ItSuspense: React.FC<IsSuspenceProps> = ({ children }) => {
  return <Suspense fallback={<ItLoading />}>{children}</Suspense>;
};

export default ItSuspense;
