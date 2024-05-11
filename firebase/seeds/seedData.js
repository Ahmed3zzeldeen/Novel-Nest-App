import Data from "../../DB/Books";
import { createBook } from "../apis/books";

export const setBooks = async () => {
  for (let i = 0; i < Math.min(Data.length, 1000); i++) {
    const element = Data[i];
    await createBook(
      +(element.ISBN),
      element.author,
      element.bookTitle,
      element.price,
      element.numOfPages,
      element.category,
      +(element.rate),
      element.cover
    );
  }
};

