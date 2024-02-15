import {  AxiosError } from "axios";
import { createContext } from "react";

type CustomError = AxiosError | Error | null;

const errorCtx = createContext<CustomError>(null);

export default errorCtx;