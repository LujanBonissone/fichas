import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import CosmetologyForm from "./components/CosmetologyForm"
import FichasList from "./components/FichasList"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FichasList />,
      },
      {
        path: "/fichas",
        element: <FichasList />,
      },
      {
        path: "/registrar",
        element: <CosmetologyForm />,
      },
    ],
  },
])

export default router
