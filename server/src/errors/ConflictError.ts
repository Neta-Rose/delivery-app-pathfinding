import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./LibraryError";

export class ConflictError extends LibraryError {
    constructor(details: string) {
      super(StatusCodes.CONFLICT, "Conflict at request", details);
    }
  }