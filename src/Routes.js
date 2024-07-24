import React from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import DraggablePage from"./Components/DraggablePage"
import DynamicDragAndDrop from "./Components/DynamicDraggablePage";

const Routes = () => {
    const pageRoutes=[
        {
            path: "/",
            renderer: (params = {}) => (
              <DraggablePage/>
            ),
          },
          {
            path: "/dynamic",
            renderer: (params = {}) => (
              <DynamicDragAndDrop/>
            ),
          }
         
    ]
  return (
    <>
      <ReactRoutes>
        {pageRoutes.map((item, i) => (
          <Route key={i} path={item.path} element={item.renderer()} />
        ))}
      </ReactRoutes>
    </>
  );
};

export default Routes;
