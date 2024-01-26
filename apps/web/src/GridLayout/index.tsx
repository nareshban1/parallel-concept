"use client";

import React, { ReactNode } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const GridLayoutComponent = ({
  layouts,
  children,
  allowEdit = false,
}: {
  layouts?: Layouts | undefined;
  children: ReactNode;
  allowEdit?: boolean | undefined;
}) => {
  return (
    <>
      <ResponsiveReactGridLayout
        draggableCancel=".interactable"
        allowOverlap={false}
        isResizable={allowEdit}
        isDraggable={allowEdit}
        compactType={"horizontal"}
        className="layout"
        containerPadding={[0, 0]}
        resizeHandles={["se"]}
        isBounded={true}
        layouts={layouts}
        rowHeight={50}
      >
        {children}
      </ResponsiveReactGridLayout>
    </>
  );
};

export default GridLayoutComponent;
