import { db } from "../Config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const booksCollectionRef = collection(db, "books");

async function getBooks() {
  const Books = await getDocs(booksCollectionRef);
  return Books.docs.map((book) => ({ ...book.data(), bookId: book.id }));
}
async function setBookCover(id , image) {
  const book = await findBookByField("bookId", id);
  book.cover = image; 
  updateBook(id,book);

  return user;
}

async function createBook(
  ISBN,
  author,
  bookTitle,
  price,
  numOfPages,
  category,
  rate,
  cover = "https://vitaldigital.us/wp-content/uploads/2017/11/book-placeholder-small.png",
) {

  
  const bookData = {
    ISBN,
    author,
    bookTitle,
    price,
    numOfPages,
    category,
    rate,
    cover,
  };
  console.log(bookData);
  if (!isNaN(ISBN)) {
    let search = await findBookByField("ISBN", ISBN);
    if (!search) {
      const book = await addDoc(booksCollectionRef, bookData);
      const updatedBook = await updateBook(book.id, {
        ...bookData,
        bookId: book.id,
      });
      return updatedBook;
    }
  }
}

async function addBook(book) {
  if (book && !isNaN(book.ISBN)) {
    let search = await findBookByField("ISBN", book.ISBN);
    if (search) {
      const book = await addDoc(booksCollectionRef, book);
      console.log("book", book);
      const updatedBook = await updateBook(book.id, {
        ...bookData,
        bookId: book.id,
      });
      return updatedBook;
    }
  }
}
async function deleteBook(bookId) {
  const bookDocRef = doc(db, "books", bookId);
  let book = await getDoc(bookDocRef);
  const res = await deleteDoc(bookDocRef);
  return res;
}

async function findBookById(bookId) {
  const bookDocRef = doc(db, "books", bookId);
  const bookDocSnapshot = await getDoc(bookDocRef);
  if (bookDocSnapshot.exists()) {
    return { ...bookDocSnapshot.data(), bookId: bookDocSnapshot.id };
  }
}

async function updateBook(bookId, bookData) {
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  const bookDocRef = doc(db, "books", bookId);
  await updateDoc(bookDocRef, { ...bookData });
}

// Accept the following fieldName = [bookId , ISBN , author , bookTitle , price , numOfPages , category , rate , cover ]
async function findBookByField(fieldName, value) {
  const q = query(booksCollectionRef, where(fieldName, "==", value));
  const querySnapshot = await getDocs(q);
  const books = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return books.length > 0 ? books[0] : null;
}

async function searchBooksByBookTitle(title) {
  const books = await getBooks();
  const filteredBooks = books.filter((item) => {
    return item.bookTitle.includes(title);
  });
  console.log("searched ", filteredBooks);
  return filteredBooks;
}

export {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  findBookById,
  findBookByField,
  searchBooksByBookTitle,
  addBook,
  setBookCover,
};
