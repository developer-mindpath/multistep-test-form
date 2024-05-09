"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";

const SuccessCard = dynamic(
  () => import("../../components/SuccessCard/successCard"),
  { ssr: false }
);

/**
 * Success page to redirect after form submission
 * @returns {ReactElement}
 */
function Success(): ReactElement {
  return <SuccessCard />;
}

export default Success;
