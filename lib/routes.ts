import { CheckCircle, CircleDollarSign, Trash } from "lucide-react";

export let ROUTES = [
  {
    name: "Prestamos",
    path: "/loans",
    icon: CircleDollarSign,
    stats: 3
  },
  {
    name: "Completados",
    path: "/completed",
    icon: CheckCircle,
    stats: 2
  },
  {
    name: "Eliminados",
    path: "/deletes",
    icon: Trash,
    stats: 2
  },
];
