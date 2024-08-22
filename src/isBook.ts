import { Interaction } from "discord.js";
import books from "./books";

export default (i: Interaction) => {
  if (
    !i.isButton() ||
    !i.customId.startsWith("s_b_s_") ||
    !books.has(i.customId.split("_")[3])
  )
    return false;

  if (books.has(i.customId.split("_")[3])) return true;
};
