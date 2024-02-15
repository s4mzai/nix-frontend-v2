import Permission from "@/data/permissions";
import { createContext } from "react";

const currPermsCtx = createContext<Permission[]>([]);

export default currPermsCtx;