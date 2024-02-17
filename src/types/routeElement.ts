import Permission from "./permissions";

export default interface RouteElement {
    path: string;
    element: React.ReactNode;
    permission: Permission[];
    label: string;
    hide?: true;
    children?: RouteElement[];
}
