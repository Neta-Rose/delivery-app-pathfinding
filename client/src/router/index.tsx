import { ReactNode } from "react";
import { OrderPage } from "../views/OrderPage";
import { HistoryPage } from "../views/HistoryPage";

export interface Page {
  path: string;
  element: ReactNode;
  name: string;
  isNotRenderedInNavbar?: boolean
}

export const pages: Page[] = [
  {
    path: "/",
    element: <OrderPage />,
    name: "order",
  },
  {
    path: "/history",
    element: <HistoryPage />,
    name: "history",
  },
];
