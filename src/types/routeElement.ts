import { NonIndexRouteObject } from "react-router-dom";
import Permission from "./permissions";

interface RouteElement extends NonIndexRouteObject {
  permission: Permission[];
  label: string;
  icon?: React.SVGProps<SVGSVGElement>;
  hide?: true;
  children?: RouteElement[];
}

export default RouteElement;
