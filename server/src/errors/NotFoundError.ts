import { StatusCodes } from "http-status-codes";
import { LibraryError } from "./LibraryError";

export class NotFoundError extends LibraryError {
  constructor(details: string) {
    super(StatusCodes.NOT_FOUND, "Not found", details);
  }
}