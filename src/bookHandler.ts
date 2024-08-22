import { Interaction } from "discord.js";
import books from "./books";
import Book from "./Book";

export default async (i: Interaction) => {
  if (!i.isButton()) return;
  await i.deferUpdate();
  const bookData = books.get(i.customId.split("_")[3]);
  const book = new Book(bookData);
  const op = i.customId.split("_")[4];
  if (!book) return;
  if (op == "first") book.setCurrentPage(1);
  if (op == "prev") book.setCurrentPage(book.currentPage - 1);
  if (op == "next") book.setCurrentPage(book.currentPage + 1);
  if (op == "last") book.setCurrentPage(book.pages.length);
  books.set(book.name, book);
  i.editReply(book.build(i.user));
};
