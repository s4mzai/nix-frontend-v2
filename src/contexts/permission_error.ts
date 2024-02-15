import Permission from "@/data/permissions";
import { createContext } from "react";

const permErrCtx = createContext<Permission[]>([]);

export default permErrCtx;