import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error";
import BookList from "./components/bookList";
import PurchaseList from "./components/purchaseList";
import CartList from "./components/cartList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "books/:genre",
        element: <BookList />,
      },
      {
        path: "purchases",
        element: <PurchaseList />,
      },
      {
        path: "cart",
        element: <CartList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
