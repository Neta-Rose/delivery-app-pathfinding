import { StatusCodes } from "http-status-codes";


export class NotFoundError extends Error {
  constructor(details: string) {
    super();
  }
}