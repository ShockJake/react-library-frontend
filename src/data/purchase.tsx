import { Book } from "./book";

export interface Purchase {
  id: string;
  date: string;
  books: Book[];
}
