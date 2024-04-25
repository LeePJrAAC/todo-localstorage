import React from "react";
import ReactDOM from "react-dom/client";
// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// css
import "./index.css";
// components
import { ErrorPage } from "./errorpage";
import { ToDo } from "./pages/projects/todo";
import { Create } from "./components/todo/create";
import { Edit } from "./components/todo/edit";
import { ToDoItem } from "./components/todo/todoItem";

import { allToDoLoader, todoLoader } from "./loaders/loaders";
import { createToDoAction, updateToDoAction, deleteToDoAction } from "./actions/actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDo />,
    errorElement: <ErrorPage />,
    loader: allToDoLoader,
    handle: {
      crumbs: () => "To Do List",
    },
    children: [
      {
        path: "/create",
        element: <Create />,
        handle: {
          crumbs: () => "Create ToDo",
        },
        action: createToDoAction,
      },
      {
        path: "/:todoId/edit",
        element: <Edit />,
        handle: {
          crumbs: () => "Edit ToDo",
        },
        action: updateToDoAction,
        loader: todoLoader,
      },
      {
        path: "/:todoId",
        element: <ToDoItem />,
        handle: {
          crumbs: () => `ToDo Item`,
        },
        loader: todoLoader,
      },
      { path: "/:todoId/destroy", action: deleteToDoAction },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
