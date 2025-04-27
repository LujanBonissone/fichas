// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import CosmetologyForm from "./components/CosmetologyForm";
import Layout from "./components/Layout";
import Login from "./Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    
    children: [
      {
        path: "/",
        element: <CosmetologyForm />,
      },
      {
        path: "/",
        element: <Layout />,
      }
    ],
  },
]);