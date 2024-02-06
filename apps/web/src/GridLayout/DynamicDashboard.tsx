"use client";

import React, { ReactNode, useState } from "react";
import GridLayoutComponent from ".";
import { Layouts } from "react-grid-layout";

const DynamicDashboard = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<Layouts>({
    lg: [
      { i: "agents", x: 0, y: 0, w: 6, h: 6 },
      { i: "weapons", x: 1, y: 0, w: 6, h: 5 },
      { i: "maps", x: 4, y: 0, w: 5, h: 5 },
    ],
  });
  const [enableEdit, setEnableEdit] = useState<boolean>(true);

  return (
    <>
      <GridLayoutComponent layouts={layout} allowEdit={enableEdit}>
        {children}
      </GridLayoutComponent>
    </>
  );
};

export default DynamicDashboard;
