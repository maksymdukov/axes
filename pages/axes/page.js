import React from "react";
import { useRouter } from "next/router";

const AxeId = props => {
  const router = useRouter();
  console.log(router.query.axeId);
  return <div>My axe</div>;
};

export default AxeId;
