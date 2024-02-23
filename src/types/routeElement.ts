import Permission from "./permissions";

interface RouteElement {
    path: string;
    element: React.ReactNode;
    permission: Permission[];
    label: string;
    hide?: true;
    children?: RouteElement[];
}

export default RouteElement;